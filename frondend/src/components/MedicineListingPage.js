// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import "../styles/MedicineListingPage.css";

// const MedicineListingPage = () => {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user || !user._id) {
//       navigate("/");
//       return navigate("/");
//     } else {
//       const fetchMedicines = async () => {
//         try {
//           const response = await axios.get('http://localhost:5000/api/search/medicine');
//           setMedicines(response.data);
//           setLoading(false);
//         } catch (err) {
//           setError(err.message);
//           setLoading(false);
//         }
//       };

//       fetchMedicines();
//     }
//   }, [navigate, user]);

//   const handleCardClick = (genericName) => {
//     const formattedGenericName = genericName.split(' ')[0];// Remove non-letter characters
//     navigate(`/search/${formattedGenericName}`);
//   };

//   // if (!user || !user._id) {
//   //   return <div>Redirecting...</div>;
//   // }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="medicine-listing-page">
//       <header className="header">
//         <SearchBar />
//       </header>

//       <main className="main">
//         <section className="spotlight">
//           <div className="medicine-card-container">
//             {medicines.map((medicine) => (
//               <div 
//                 key={medicine._id} 
//                 className="medicine-card" 
//                 onClick={() => handleCardClick(medicine.genericName)}
//               >
//                 <img src={medicine.imageURL} alt={medicine.name} className="medicine-image" />
//                 <div className="medicine-details">
//                   <div className="medicine-info">
//                     <h3 className="medicine-name">{medicine.name}</h3>
//                     <p className="generic-name">{medicine.genericName}</p>
//                     <p className="manufacturer">{medicine.manufacturer}</p>
//                     {medicine.shopId && (
//                       <div className="store-info">
//                         <p className="store-name">{medicine.shopId.name}</p>
//                         <p className="store-address">{medicine.shopId.address}</p>
//                         <div className="price-cart">
//                           <span className="store-price">₹{medicine.price}</span>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default MedicineListingPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import "../styles/MedicineListingPage.css";

const MedicineListingPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user._id) {
      navigate("/");
      return navigate("/");
    } else {
      const fetchMedicines = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/search/medicine');
          setMedicines(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchMedicines();
    }
  }, [navigate, user]);

  const handleCardClick = (genericName) => {
    const formattedGenericName = genericName.split(' ')[0]; 
    navigate(`/search/${formattedGenericName}`);
  };

  // if (!user || !user._id) {
  //   return <div>Redirecting...</div>;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="medicine-listing-page">
      <header className="header">
        <SearchBar />
      </header>

      <main className="main">
        <section className="spotlight">
          <div className="medicine-card-container">
            {medicines.map((medicine) => (
              <div 
                key={medicine._id} 
                className="medicine-card" 
                onClick={() => handleCardClick(medicine.genericName)}
              >
                <img src={medicine.imageURL} alt={medicine.name} className="medicine-image" />
                <div className="medicine-details">
                  <div className="medicine-info">
                    <h3 className="medicine-name">{medicine.name}</h3>
                    <p className="generic-name">{medicine.genericName}</p>
                    <p className="manufacturer">{medicine.manufacturer}</p>
                    {medicine.shopId && (
                      <div className="store-info">
                        <p className="store-name">{medicine.shopId.name}</p>
                        <p className="store-address">{medicine.shopId.address}</p>
                        <div className="price-cart">
                          <span className="store-price">₹{medicine.price}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MedicineListingPage;