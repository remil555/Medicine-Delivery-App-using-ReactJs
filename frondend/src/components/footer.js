import logo from "../assets/logo.png";
import YT from "../assets/YT.png"
import IG from "../assets/IG.png"
import FB from "../assets/FB.png"
import LI from "../assets/LI.png"
const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-section">
        <img 
            src={logo} 
            alt="logo" 
          />
          <h2>Chi Square Health+</h2>
          <div className="social-icons">
          <a href="https://chisquarelabs.com/contact/#" className="social-icon"><img src={IG} alt="Instagram"/></a>
          <a href="https://www.linkedin.com/company/chisquarelabs/" className="social-icon"><img src={LI} alt="LinkedIn"/></a>
          <a href="https://chisquarelabs.com/contact/#" className="social-icon"><img src={YT} alt="Youtube"/></a>
          <a href="https://chisquarelabs.com/contact/#" className="social-icon"><img src={FB} alt="Facebook"/></a>
        </div>
        </div>
        <div className="footer-section">
          <h2>Information</h2>
          <ul>
            <li><a href="https://chisquarelabs.com/about/">About Us</a></li>
            <li><a href="https://chisquarelabs.com/">Blog</a></li>
            <li><a href="https://chisquarelabs.com/">Events</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Our Services</h2>
          <ul>
            <li><a href="https://chisquarelabs.com/">Product List</a></li>
            <li><a href="https://chisquarelabs.com/">Order</a></li>
            <li><a href="https://chisquarelabs.com/">Return</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Customer Services</h2>
          <ul>
            <li><a href="https://chisquarelabs.com/contact/#">Contact Us</a></li>
            <li><a href="https://chisquarelabs.com/">F.A.Q</a></li>
            <li><a href="https://chisquarelabs.com/">Health Articles</a></li>
          </ul>
        </div>
      </footer>
    );
  };

  export default Footer;