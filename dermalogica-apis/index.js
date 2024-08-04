import cors from 'cors';
import axios from 'axios';
import express from "express";
import config from './config/db.js';
import routes from "./routes/index.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors('*'))
app.use(express.json());


app.use("/derma", routes);

app.get('/pincode',(req,res)=>{
  let zipcode = req.query.zipcode;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://track.delhivery.com/c/api/pin-codes/json?filter_codes=${zipcode}`,
    headers: { 
      'Authorization': 'Bearer 2b1af8b639c39e2823e2955bb4f94e5f9ad12c26'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.status(200).json(response.data);
  })
  .catch((error) => {
    console.log(error);
    res.status(404).json(response.data);
  });
  
});

  const port = process.env.PORT || 7000;
  app.listen((port), () => {
    config;
    console.log(`application listening on http://localhost:${port}`);
  });
