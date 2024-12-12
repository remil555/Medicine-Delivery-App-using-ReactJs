// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import "../styles/SearchResultPage.css";
// import SearchBar from './SearchBar.js';

// const SearchResultPage = () => {
//   const { query } = useParams();
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('default');
//   const [filterBy, setFilterBy] = useState('all');
//   const [maxDistance, setMaxDistance] = useState(5); 

//   const user = JSON.parse(localStorage.getItem("user"));
//   const { location } = user;
//   const { _id: userId } = user;
//   const [lon, lat] = location.coordinates;

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/search/medicine-search?query=${query}&lat=${lat}&lon=${lon}&maxDistance=50`);
//         let fetchedMedicines = response.data;

//         if (sortBy === 'price-asc') {
//           fetchedMedicines.sort((a, b) => {
//             const priceA = a.products[0].price; // Assuming only one product for simplicity
//             const priceB = b.products[0].price; // Change this if more products are available
//             return priceA - priceB;
//           });
//         } else if (sortBy === 'price-desc') {
//           fetchedMedicines.sort((a, b) => {
//             const priceA = a.products[0].price; // Assuming only one product for simplicity
//             const priceB = b.products[0].price; // Change this if more products are available
//             return priceB - priceA;
//           });
//         }

//         setMedicines(fetchedMedicines);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchMedicines();
//   }, [query, sortBy, filterBy, maxDistance, lat, lon]);

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     const value = e.target.value;
//     setFilterBy(value);

//     if (value === 'distance-10') {
//       setMaxDistance(10);
//     } else if (value === 'distance-30') {
//       setMaxDistance(30);
//     } else {
//       setMaxDistance(5); 
//     }
//   };

//   const handleAddToCart = async (medicine, shop) => {
//     try {
//       await axios.post('http://localhost:5000/api/cart/add', {
//         userId: userId,
//         shopId: shop.shopid,
//         name: medicine.name,
//         storeName: shop.name,
//         price: medicine.price,
//         quantity: 1
//       });
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="medicine-listing-page">
//       <header className="header">
//         <SearchBar value={query} />
//       </header>

//       <div className="search-options">
//         <div className="sort-filter">
//           <select value={sortBy} onChange={handleSortChange}>
//             <option value="default">Sort By</option>
//             <option value="price-asc">Price (Low to High)</option>
//             <option value="price-desc">Price (High to Low)</option>
//           </select>
//           <select value={filterBy} onChange={handleFilterChange}>
//             <option value="all">Filter By</option>
//             <option value="distance-10">Distance ≤ 10 Km</option>
//             <option value="distance-30">Distance ≤ 30 Km</option>
//           </select>
//         </div>
//       </div>

//       <main className="main">
//         <section className="spotlight">
//           <div className="medicine-card-container">
//             {medicines.map((shop) => (
//               shop.products.map((medicine) => (
//                 <div key={medicine._id} className="medicine-card">
//                   {/* <img src={medicine.imageURL} alt={medicine.name} className="medicine-image" /> */}
//                   <div className="medicine-details">
//                     <div className="medicine-info">
//                       <h3 className="medicine-name">{medicine.name}</h3>
//                       <p className="generic-name">{medicine.genericName}</p>
//                       <p className="manufacturer">{medicine.manufacturer}</p>
//                       <p className="store-name">Sold by: {shop.name}</p>
//                       <p className="store-distance">Distance: {shop.distance}</p>
//                       <div className="price-cart">
//                         <span className="store-price">₹{medicine.price}</span>
//                         <button className="add-to-cart" onClick={() => handleAddToCart(medicine, shop)}>
//                           ADD
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default SearchResultPage;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/SearchResultPage.css";
import SearchBar from './SearchBar.js';

const SearchResultPage = () => {
  const { query } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [filterBy, setFilterBy] = useState('all');
  const [maxDistance, setMaxDistance] = useState(50);
  let [cartCount, setCartCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const { location } = user;
  const { _id: userId } = user;
  const [lon, lat] = location.coordinates;

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search/medicine-search?query=${query}&lat=${lat}&lon=${lon}&maxDistance=50`);
        let fetchedMedicines = response.data;

        // Apply distance filter
        fetchedMedicines = fetchedMedicines.filter(shop => {
          const distanceValue = parseInt(shop.distance.split(' ')[0], 10); // Extract numerical value before space
          return distanceValue < maxDistance;
        });

        // Flatten the list of medicines
        let allMedicines = [];
        fetchedMedicines.forEach(shop => {
          shop.products.forEach(medicine => {
            allMedicines.push({ ...medicine, shopName: shop.name, shopDistance: shop.distance, shopId: shop.shopid });
          });
        });

        // Apply sorting
        if (sortBy === 'price-asc') {
          allMedicines.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === 'price-desc') {
          allMedicines.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        setMedicines(allMedicines);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [query, sortBy, filterBy, maxDistance, lat, lon]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterBy(value);

    if (value === 'distance-10') {
      setMaxDistance(10);
    } else if (value === 'distance-30') {
      setMaxDistance(30);
    } else {
      setMaxDistance(50);
    }
  };

  const handleAddToCart = async (medicine) => {
    cartCount=0;
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId: userId,
        shopId: medicine.shopId,
        name: medicine.name,
        storeName: medicine.shopName,
        price: medicine.price,
        quantity: 1
      });
      setCartCount(cartCount + 1); // Increment cart count
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="medicine-listing-page">
      <header className="header">
        <SearchBar value={query}  /> {/* Pass cartCount to SearchBar */}
      </header>

      <div className="search-options">
        <div className="sort-filter">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="default">Sort By</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
          <select value={filterBy} onChange={handleFilterChange}>
            <option value="all">Filter By</option>
            <option value="distance-10">Distance &lt; 10 Km</option>
            <option value="distance-30">Distance &lt; 30 Km</option>
          </select>
        </div>
      </div>

      <main className="main">
        <section className="spotlight">
          <div className="medicine-card-container">
            {medicines.map((medicine) => (
              <div key={medicine._id} className="medicine-card">
                {/* <img src={medicine.imageURL} alt={medicine.name} className="medicine-image" /> */}
                <div className="medicine-details">
                  <div className="medicine-info">
                    <h3 className="medicine-name">{medicine.name}</h3>
                    <p className="generic-name">{medicine.genericName}</p>
                    <p className="manufacturer">{medicine.manufacturer}</p>
                    <p className="store-name">Sold by: {medicine.shopName}</p>
                    <p className="store-distance">Distance: {medicine.shopDistance}</p>
                    <div className="price-cart">
                      <span className="store-price">₹{medicine.price}</span>
                      <button className="add-to-cart" onClick={() => handleAddToCart(medicine)}>
                        ADD
                      </button>
                    </div>
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

export default SearchResultPage;


