// const express=require("express");
// const connectToMongoDB= require("./db/connectToMongo");
// const searchRoutes = require('./routes/search');

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import path from'path';
import { fileURLToPath } from 'url';

import authRoutes from "../backend/routes/auth.routes.js";
import connectToMongoDB from '../backend/db/connectToMongo.js';
import searchRoutes from "../backend/routes/search.js";
import cartRoutes from "../backend/routes/cart.routes.js"
import orderRoutes from "../backend/routes/order.routes.js"
import couponRoute from "./routes/coupon.router.js"
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.use(express.json());//to parse the incoming requests with JSON Payloads(from req.body)
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello world!!!!!");
});

app.use("/api/auth", authRoutes);
app.use("/api/search",searchRoutes)
app.use('/api/cart', cartRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/coupon', couponRoute);

app.listen(PORT, () =>{
    connectToMongoDB();
    console.log(`Server is running in port ${PORT}`)
});