import mongoose from "mongoose";
const User = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        Mobile: {
            type: Number,
            required: true,
        },
        Email: {
            type: String,
            required: true,
        },
        Password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Users = mongoose.model("user", User);

export default Users;