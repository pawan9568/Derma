import Users from '../models/user.js'
import Jwt from "jsonwebtoken";
const SECRET_KEY = 'dermaLogica@123';
const UserData = {
    Name: "Pawan",
    Email: "Pawan@gmail.com",
    Mobile: 9568473567,
    Password: 12345
}
const { Name, Email, Mobile, Password } = UserData

const userCreate = async () => {
    try {
        const NewUser = new Users({
            Name: Name,
            Mobile: Mobile,
            Email: Email,
            Password: Password,
        });

        // Save the new user to the database
        await NewUser.save();
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

const userLogin = (async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const user = await Users.findOne({ Email });
        if (!user) {
            return res.status(400).send({
                message: "Invalid Email"
            });
        } else {
            if (user.Password != Password) {
                return res.status(400).send({
                    message: "Invalid Password"
                });
            }
            else {
                const token = Jwt.sign({ Email: user.Email }, SECRET_KEY);
                return res.status(200).send({
                    message: "User Login",
                    data: user,
                    Token: token
                });
            }
        }


    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }


})

const GetUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming your route parameter is named 'id'
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        console.log("User Profile:", user);

        // Send the user profile in the response
        res.status(200).send({
            user
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

export {
    userCreate,
    userLogin,
    GetUserProfile
}

