import express from 'express';
import { addCart, showCart, deleteItem, updateQuantity } from '../controller/cart.controller.js';

const router = express.Router();

router.post("/add", addCart);
router.post("/show", showCart);  
router.delete("/delete/:userId/:id", deleteItem);  
router.put("/update/:userId/:id", updateQuantity);  

export default router;
