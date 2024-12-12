import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` for React Router v6
import axios from 'axios';
import SearchBar from './SearchBar';
import '../styles/OrderPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { _id } = user;
  const navigate = useNavigate(); // Use `useNavigate` for navigation

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/list?userId=${_id}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [_id]);

  return (
    <div className="order-page">
      <header className="header">
        <SearchBar />
      </header>
      <div className="main-container">
        <div className="orders-container">
          <div className="orders-list">
            <h2>All Orders</h2>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User Name</th>
                  <th>Address</th>
                  <th>Medicine Name</th>
                  <th>Store Name</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Total Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    {order.cartItems.map((item, index) => (
                      <tr key={`${item._id}-${index}`} className="order-row">
                        {index === 0 && (
                          <>
                            <td rowSpan={order.cartItems.length}>{order._id}</td>
                            <td rowSpan={order.cartItems.length}>{order.userId.fullname}</td>
                            <td rowSpan={order.cartItems.length}>{order.userId.address}</td>
                          </>
                        )}
                        <td>{item.name}</td>
                        <td>{item.storeName}</td>
                        <td>{item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        {index === 0 && (
                          <>
                            <td rowSpan={order.cartItems.length}>{order.status}</td>
                            <td rowSpan={order.cartItems.length}>{order.totalAmount.toFixed(2)}</td>
                          </>
                        )}
                      </tr>
                    ))}
                    {order.cartItems.length === 0 && (
                      <tr key={`${order._id}-summary`} className="order-row">
                        <td>{order._id}</td>
                        <td>{order.userId.fullname}</td>
                        <td>{order.userId.address}</td>
                        <td colSpan="4">No items in this order</td>
                        <td>{order.status}</td>
                        <td>{order.totalAmount.toFixed(2)}</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="order-summary">
        <h3>Order Summary</h3>
        <table>
          <tbody>
            {/* <tr>
              <th>Total :</th>
              <td>₹{orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2)}</td>
            </tr> */}
          </tbody>
        </table>
        <div className="total-amount">
          Total: ₹{orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2)}
        </div>
            {/* <div className="button-container"> */}
              <button className="home" onClick={() => navigate('/medicine-listing')}>Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
