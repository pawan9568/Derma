import { Router } from "express";
import Jwt from "jsonwebtoken";
import {sendBulkOrder , Singleorderid , GetAllOrder} from "../controllers/mailAPI.js"
import {userCreate ,userLogin , GetUserProfile } from '../controllers/user.js'
import adminAPI from "../controllers/admin.js";
const SECRET_KEY = 'dermaLogica@123';
import {addProducts, bulkProductsAdd, updateProduct, getProduct, deleteProduct , GetSingleProduct} from "../controllers/productAPI.js";
// userCreate()
const  router= Router();

router.post('/send_bulk_order', VerifyToken,sendBulkOrder);
router.post('/adminlogin',adminAPI);
router.post('/addproducts' ,VerifyToken ,addProducts);
router.post('/bulkproductsadd' , VerifyToken,bulkProductsAdd);
router.put('/update/:id',VerifyToken, updateProduct);
router.get('/getproduct',VerifyToken, getProduct);
router.get("/getSingleProduct/:id" , VerifyToken, GetSingleProduct)
router.delete('/delete/:id',VerifyToken, deleteProduct);
router.get('/order/:id',VerifyToken, Singleorderid);
router.get('/allorder',VerifyToken, GetAllOrder);

router.post('/login',userLogin)
router.get("/user/:id" , VerifyToken,  GetUserProfile)
function VerifyToken(req, res, next) {
    let Token = req.headers.authorization
    if (Token) {
        Token = Token.split(' ')[1]
        // console.log("Token" , Token)
        Jwt.verify(Token, SECRET_KEY, (err, valid) => {
            if (err) {
                // console.log("Error part")
                res.status(401).send({ result: "Please Provide valid token" })
            }
            else {
                next()
            }
        })
    }
    else {
        res.status(400).send({ result: "Please add Token in Header" })
    }

}
export default router;  