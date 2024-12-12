import mainImg from "../assets/main.png"
import { useNavigate } from 'react-router-dom';


const MainContent = () => {
  const navigate = useNavigate();
  const handleButton=()=>{
    navigate("/login");
  }
    return (
      <main className="main-content">
        <div className="image-section">
          <img 
            src={mainImg} 
            alt="Group of healthcare professionals" 
            className="hero-image"
          />
        </div>
        <div className="text-section">
          <h1>Welcome To Chi Square Health+</h1>
          <button className="explore-button" onClick={handleButton}>Explore Now</button>
        </div>
      </main>
    );
  };

  export default MainContent;