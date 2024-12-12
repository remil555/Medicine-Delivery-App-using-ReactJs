import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/logo.png";
import '../styles/Register.css'; // Import the CSS file

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    fullname: "",
    username: "", 
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data: res } = await axios.post("http://localhost:5000/api/auth/signup", {
        fullname: data.fullname,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
        address: data.address,
      });
      alert('Registration successfully');
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        if (error.response.status === 409) {
          setError("Already registered, please sign in");
        } else {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Welcome to Chisquare Health+</h1>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={data.fullname}
          required
          onChange={handleChange}
          name='fullname'
        />
        <input
          type="text"
          placeholder="Email"
          required
          name='username'
          onChange={handleChange}
          value={data.username}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name='password'
          onChange={handleChange}
          value={data.password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          name='confirmPassword'
          onChange={handleChange}
          value={data.confirmPassword}
        />
        <textarea
          placeholder="Address"
          required
          name='address'
          onChange={handleChange}
          value={data.address}
        />
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <button type="submit">
          Register
        </button>
      </form>
      <p>
        <Link to="/login" className="link">
          Already registered?
        </Link>
      </p>
    </div>
  );
};

export default Register;
