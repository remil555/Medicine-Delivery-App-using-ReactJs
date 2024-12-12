import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SearchBar.css";
import axios from 'axios';

function SearchBar({value=""}) {
  const [searchQuery, setSearchQuery] = useState(value);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const { _id: userId } = user;
  if(userId==null){
    navigate("/");
  }
 
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/cart/show', { userId });
        setItemCount(response.data.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const res=await axios.post("http://localhost:5000/api/auth/logout");
      navigate("/");
       if(res){
        console.log(res.data.message);
        
       
      // Clear localStorage or perform any other necessary cleanup
      localStorage.removeItem("Token");
      localStorage.removeItem("pic");
      localStorage.removeItem("user");
      alert('Logout successfully');
       }
    } catch (error) {
      console.error("Error logging out:", error);
    }
    
  };

  const cartHandle = () => {
    navigate('/cart');
  }

  const pic = localStorage.getItem("pic");
  return (
    <>
      {/* search bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <button type="submit">Search</button> */}
        </form>
      </div>

      <div className="header-container">
        {/* cart */}
        <div role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={cartHandle}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="badge badge-sm indicator-item">{itemCount} </span>
          </div>
        </div>

        {/* profile */}
        <div className="profile">
          <img
            src={pic} // Replace with the actual path to the profile picture
            alt="Profile pic"
            className="profile-pic"
            onClick={handleProfileClick}
          />
          {isDropdownOpen && (
            <div className="dropdown">
              <button onClick={() => navigate('/orders')}>Orders</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBar;



