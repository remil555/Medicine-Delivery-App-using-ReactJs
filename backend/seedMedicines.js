// const mongoose = require('mongoose');
// const Medicine = require('./models/Medicine');
// const Shop = require('./models/Shop');
// require('dotenv').config();

import dotenv from 'dotenv';
import mongoose from "mongoose";
import Shop from './models/shop.js';
import Medicine from './models/medicine.modal.js';


dotenv.config();

const medicines = [
  {
    name: 'Glycomet 500 mg Tablet',
    genericName: 'Metformin',
    manufacturer: 'USV Pvt Ltd',
    shopName: 'Downtown Pharmacy',
    price: 17.34,
    rating: 4.2,
    quantity: 10,
    imageURL:"http://localhost:5000/backend/uploads/Glycomet.jpg"
  },
  {
    name: 'Istamet 50 mg / 500 MG Tablet',
    genericName: 'Sitagliptin / Metformin',
    manufacturer: 'Merck Ltd',
    shopName: 'Neighborhood Pharmacy',
    price: 15.60,
    rating: 4.9,
    quantity: 15,
    imageURL:"http://localhost:5000/backend/uploads/ist.jpg"
  },
  {
    name: 'Janumet 50/500 mg Tablet',
    genericName: 'Sitagliptin / Metformin',
    manufacturer: 'MSD Pharmaceuticals',
    shopName: 'Uptown Drugstore',
    price: 150.00,
    rating: 3.6,
    quantity: 15,
    imageURL:"http://localhost:5000/backend/uploads/jan.jpg"
  },
  {
    name: 'Glycomet 500 mg Tablet',
    genericName: 'Metformin',
    manufacturer: 'USV Pvt Ltd',
    shopName: 'Health First Pharmacy',
    price: 37.40,
    rating: 4.7,
    quantity: 20,
    imageURL:"http://localhost:5000/backend/uploads/gly.jpg"
  },
  {
    name: 'Galvus Met 50 mg / 500 mg Tablet',
    genericName: 'Vildagliptin / Metformin',
    manufacturer: 'Novartis India Ltd',
    shopName: 'CityCare Pharmacy',
    price: 229.95,
    rating: 1.6,
    quantity: 15,
    imageURL:"http://localhost:5000/backend/uploads/gal.jpg"
  },
];

mongoose.connect("mongodb://localhost:27017/chitest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  
  for (let med of medicines) {
    const shop = await Shop.findOne({ name: med.shopName });
    med.shopId = shop._id;
  }
  
  return Medicine.insertMany(medicines);
})
.then(() => {
  console.log('Medicines added successfully');
  mongoose.disconnect();
})
.catch(err => {
  console.error(err);
  mongoose.disconnect();
});
