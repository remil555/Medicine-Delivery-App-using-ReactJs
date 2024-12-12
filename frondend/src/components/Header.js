import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import "../styles/Header.css"


const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="headers" style={{ backgroundColor:'linear-gradient(to right, #a8edea, #fed6e3)' }}>
      {/* <img style={{height:"60px"}}
            src={logo} 
            alt="logo" 
          /> */}
          <img style={{height:"80px",filter: 'brightness(0) invert(1)'}}
            src={logo} 
            alt="logo" 
          />
      {/* <input type="text" placeholder="Search" className="search-bar" /> */}
      <div className="auth-buttons">
        <button className="sign-up" onClick={() => navigate('/register')}>Sign Up</button>
        <button className="login" onClick={() => navigate('/login')}>Login</button>
      </div>
    </header>
  );
};

export default Header;


