import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/login.css';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState(
    {
      username: "",
      password: "",
    }
  );
  const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post("http://localhost:5000/api/auth/login", {
        username: data.username, 
        password: data.password,
      });
      
      localStorage.setItem("Token", res.token);
      localStorage.setItem("pic", res.user.profilePic);
      localStorage.setItem("user",JSON.stringify(res.user))
      
      navigate("/medicine-listing")

      alert('Login successfully');
    } catch (error) {
      if (
        error.res &&
        error.res.status >= 400 &&
        error.res.status <= 500
      ) {
        setError(error.res.data.message);
      }
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <p>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }} className="link">
          New User?
        </a>
      </p>
    </div>
  );
};

export default Login;

