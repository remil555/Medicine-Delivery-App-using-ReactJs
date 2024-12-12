import Order from '../models/order.model.js';
import Cart from "../models/cart.model.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, totalAmount, status } = req.body;
    // console.log("cartItems")
    cartItems.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);
    });
    const newOrder = new Order({
      userId,
      cartItems,
      totalAmount,
      status
    });

    await newOrder.save();

    await Cart.deleteMany({ userId });

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }

};



export const getAllOrders = async (req, res) => {
  const userId = req.query.userId;

  try {
    let orders;

    if (userId) {
      orders = await Order.find({ userId }).populate('userId', 'fullname username address');
    } else {
      orders = await Order.find().populate('userId', 'fullname username address');
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};


// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate('userId', 'fullname username address');
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

