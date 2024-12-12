import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cartPage.css';
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const { _id: userId } = user;
  const navigate = useNavigate(); // Updated to useNavigate

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/cart/show', { userId });
        setCartItems(response.data);
        calculateGrandTotal(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const increaseQuantity = async (itemId) => {
    try {
      const item = cartItems.find(item => item._id === itemId);
      const response = await axios.put(`http://localhost:5000/api/cart/update/${userId}/${itemId}`, { quantity: item.quantity + 1 });
      const updatedCartItems = cartItems.map(item => item._id === itemId ? response.data : item);
      setCartItems(updatedCartItems);
      calculateGrandTotal(updatedCartItems);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      const item = cartItems.find(item => item._id === itemId);
      if (item.quantity > 1) {
        const response = await axios.put(`http://localhost:5000/api/cart/update/${userId}/${itemId}`, { quantity: item.quantity - 1 });
        const updatedCartItems = cartItems.map(item => item._id === itemId ? response.data : item);
        setCartItems(updatedCartItems);
        calculateGrandTotal(updatedCartItems);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/delete/${userId}/${itemId}`);
      const updatedCartItems = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedCartItems);
      calculateGrandTotal(updatedCartItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleCouponApply = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/coupon/apply', { couponCode, cartItems });
      setCartItems(response.data.updatedCartItems);
      calculateGrandTotal(response.data.updatedCartItems);
      alert('Coupon applied successfully');
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Invalid coupon code or not applicable');
    }
  };

  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        name: item.name,
        storeName: item.storeName,
        price: item.price,
        quantity: item.quantity
      }));
      const totalAmount = grandTotal;
      const orderDetails = {
        userId,
        cartItems: orderItems,
        totalAmount: totalAmount,
        status: 'pending'
      };
      
      await axios.post('http://localhost:5000/api/order/create', orderDetails);
      console.log('Order placed successfully');
      alert('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const calculateGrandTotal = (items) => {
    const itemTotals = items.map(item => item.quantity * item.price);
    const total = itemTotals.reduce((total, current) => total + current, 0);
    setGrandTotal(total);
  };

  const handleViewOrders = () => {
    navigate('/orders'); // Updated to useNavigate
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-content">
        <div className="cart-items-container">
          <div className='each-item-cart'>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={item._id} className="cart-item">
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <h4>sold by: {item.storeName}</h4>
                    <p>Price: ₹{item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item._id)}>-</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => increaseQuantity(item._id)}>+</button>
                    </div>
                  </div>
                  <div className="delete-btn">
                    <button onClick={() => deleteItem(item._id)}>X</button>
                  </div>
                  <div className="item-total">
                    <p>₹{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cart-summary">
          <div className="left-section">
            <div className="coupon-section">
              <input type="text" value={couponCode} onChange={handleCouponCodeChange} placeholder="Enter Coupon Code" />
              <button onClick={handleCouponApply}>Apply</button>
            </div>
          </div>
          <div className="right-section">
            <div className="grand-total">
              <h3>Grand Total: </h3>
              <p>₹{grandTotal.toFixed(2)}</p>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            <button className="view-orders-button" onClick={handleViewOrders}>View Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;