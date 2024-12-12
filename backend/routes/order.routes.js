import express from 'express';
import { createOrder, getAllOrders } from '../controller/order.controller.js';
// import { authMiddleware } from '../controller/auth.controller.js';

const router = express.Router();


// router.use(authMiddleware);
router.post('/create', createOrder);
// router.get('/:id', getOrderById);
router.get('/list', getAllOrders);
// router.put('/:id', updateOrderStatus);

export default router;
