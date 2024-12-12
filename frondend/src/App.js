import React from 'react';
import './App.css';
import Footer from "./components/footer.js";
import Login from './components/Login.js';
import Register from './components/Register.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import SearchResultPage from './components/SearchResultPage.js';
import MedicineListingPage from './components/MedicineListingPage.js';
import OrderPage from './components/OrderPage.js';
import CartPage from './components/CartPage.js';

const App = () => {
  const user = localStorage.getItem("Token");

  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                // user ? <Navigate to="/medicine-listing"  /> :
                 <HomePage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/medicine-listing"
              // element={user ? <MedicineListingPage /> : <Navigate to="/login" replace />}
              element={ <MedicineListingPage />}
            />
            <Route
              path="/search/:query"
              // element={user ? <SearchResultPage /> : <Navigate to="/login"  />}
              element={<SearchResultPage /> }
            />
            <Route
              path="/cart"
              // element={user ? <CartPage /> : <Navigate to="/login"  />}
              element={<CartPage /> }
            />
            <Route
              path="/orders"
              // element={user ? <OrderPage /> : <Navigate to="/login"  />}
              element={ <OrderPage /> }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
