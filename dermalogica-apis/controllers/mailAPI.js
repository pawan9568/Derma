import Order from '../models/orders.js'
import Product from '../models/addProduct.js'
import nodemailer from "nodemailer";

// import bodyParser from 'body-parser';

// var transport = nodemailer.createTransport({
//     service: "gmail",
//     port: "465",
//     secure: true,
//     secureConnection: false,
//     auth: {
//         user: "realvikasbind@gmail.com",
//         pass: "hdpzwblrmgltytiq",
//     },
// });

const sendBulkOrder = async (req, res) => {
    const { SalaonName, DeliveryAddress, City, Name, Email, MobileNumber, qty } = req.body;
    const orderNumbers = req.body.orderNumber;
    try {
        const matchedProducts = await Product.find({ product_id: { $in: orderNumbers } }).select('-createdAt -updatedAt -__v');
        const totalOrderAmount = matchedProducts.reduce((total, product) => total + product.product_price, 0);
        const newOrder = new Order({
            SalaonName: SalaonName,
            DeliveryAddress: DeliveryAddress,
            City: City,
            Name: Name,
            Email: Email,
            MobileNumber: MobileNumber,
            Totalorderamount: totalOrderAmount,
            products: matchedProducts,
        });
        await newOrder.save();
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
        });

        // const mailData = req.body;
        // console.log("mailData>>>", mailData);
        // let templ = `
        //     <!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //         <title>Document</title>
        //     </head>
        //     <body>
        //         <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
        //             <div>
        //                 <h1>Dermalogica India</h1>
        //                 <h3>A customer has just submitted a form!</h3>
        //                 <p>Go to the App admin to check details.</p>
        //                 <br>
        //                 <b>More information</b>
        //                 <table border="1" style="border-collapse:collapse; width: 540px;">
        //                     <tr>
        //                         <th style="text-align: start; padding-left: 10px;">Salon name</th>
        //                         <td>test name</td>
        //                     </tr>
        //                     <tr>
        //                         <th style="text-align: start; padding-left: 10px;">Delivery Address</th>
        //                         <td>Noida</td>
        //                     </tr>
        //                     <tr>
        //                         <th style="text-align: start; padding-left: 10px;">City</th>
        //                         <td>Noida</td>
        //                     </tr>
        //                     <tr>
        //                         <th style="text-align: start; padding-left: 10px;">Your Name</th>
        //                         <td>test name</td>
        //                     </tr>
        //                     <tr>
        //                         <th style="text-align: start; padding-left: 10px;">Email ID</th>
        //                         <mailto:td>test@gmail.com</td>
        //                     </tr>
        //                     <tr>
        //                         <th style="text-align: start; padding-left: 10px;">Mobile Number</th>
        //                         <td>9922334411</td>
        //                     </tr>
        //                 </table>
        //                 <br>
        //                 <b>Products for Bulk Order</b>
        //                 <table border="1" style="border-collapse:collapse; width: 540px;">
        //                     <tr>
        //                         <th>Title</th>
        //                         <th>Quantity</th>
        //                         <th>Price</th>
        //                         <th>Totale</th>
        //                     </tr>
        //                     <tr>
        //                         <td>ABCD Product</td>
        //                         <td>5</td>
        //                         <td>100</td>
        //                         <td>500</td>
        //                     </tr>
        //                     <tr>
        //                         <td>XYZ Product</td>
        //                         <td>6</td>
        //                         <td>200</td>
        //                         <td>1200</td>
        //                     </tr>
        //                     <tr>
        //                         <td colspan="4" style="text-align: end;"><b>Subtotal.</b>1200</td>
        //                     </tr>
        //                 </table> 
        //             </div>        
        //         </div>
        //     </body>
        //     </html>`
        // const ccAddresses = ["mailto:mayank.varshney@ens.enterprises", "mailto:shubham.sharma@ens.enterprises" ,"mailto:pawan.kumar@ens.enterprises"];
        // const mailOptions = {
        //   to: "mailto:vikas.bind@ens.enterprises",
        //   cc: ccAddresses.join(', '),
        //   subject: "Bulk Order",
        //   text: 'This is the text content of the email.',
        //   html: templ,

        // };
        // console.log("mailOptions>>>>", mailOptions);
        // transport.sendMail(mailOptions, (error, info) => {
        //   if (error) {
        //     console.error(error);
        //     res.status(500).json({ error: "Email sending failed" });
        //   } else {
        //     console.log("Email sent: " + info.response);
        //     res.status(200).json({ message: "Email sent successfully" });
        //   }
        // });



    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
};
const Singleorderid = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const GetAllOrder = async (req, res) => {
    try {
        const getOrder = await Order.find();
        res.status(200).json({
            success: true,
            message: "Orders get successfully",
            data: getOrder,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
}

export default Singleorderid;

export {
    sendBulkOrder,
    Singleorderid,
    GetAllOrder
};
