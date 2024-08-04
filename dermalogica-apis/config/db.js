import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect("mongodb+srv://mayankvarshney:12345@dermalogica.1ciifd5.mongodb.net/")
  .then(() => console.log("Connected Successfuly"))
  .catch(() => console.log("Connection failed"));

const config = {
  PORT: process.env.PORT,
}; 

export default config;