import Cart from "../models/cart.model.js";

export const addCart = async (req, res) => {
  try {
    const { userId, shopId, name, storeName, price, quantity } = req.body;

    // console.log(userId, shopId, name, storeName, price, quantity)
    const existingItem = await Cart.findOne({ userId, shopId, name, storeName });

    if (existingItem) {
    
      existingItem.quantity += 1;
      await existingItem.save();
      res.json(existingItem);
    } else {
      const newItem = new Cart({
        userId,
        shopId,
        name,
        storeName,
        price,
        quantity,
      });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (error) {
    console.error("Error Adding cart:", error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const showCart = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(userId)
    const cartItems = await Cart.find({ userId });
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { userId, id } = req.params;
    await Cart.findOneAndDelete({ _id: id, userId });  
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);  
    res.status(500).json({ error: 'Error deleting item' });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { userId, id } = req.params;
    const { quantity } = req.body;
    const updatedItem = await Cart.findOneAndUpdate({ _id: id, userId }, { quantity }, { new: true }); 
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item quantity:', error);  
    res.status(500).json({ error: 'Error updating item quantity' });
  }
};
