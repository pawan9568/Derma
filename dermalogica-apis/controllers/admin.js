import Jwt from "jsonwebtoken";
import {Admin} from "../models/admin.js";

const SECRET_KEY = 'dermaLogica@123';

const adminAPI = (async (req, res) => {
  try {
    const { adminname, password } = req.body;
    const admin = Admin.find(a => a.adminname === adminname && a.password === password);
    if (admin) {
      const token = Jwt.sign({ adminname: admin.adminname }, SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
});
export default adminAPI;