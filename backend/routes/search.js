import express from 'express'
const router = express.Router();
import { searchProducts,list } from '../controller/searchController.js'

router.get("/medicine-search", searchProducts);
router.get("/medicine",list);

export default router;
