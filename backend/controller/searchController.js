import axios from 'axios';
import Shop from '../models/shop.js';
import Medicine from "../models/medicine.modal.js";

export const list = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate('shopId');
    res.status(200).json(medicines);
  } catch (error) {
    console.error("Error listing medicines:", error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

const OSRM_SERVER_URL = "http://65.0.179.191:5000"; // Update with your actual OSRM server URL

export const searchProducts = async (req, res) => {
  const { query, lat, lon, maxDistance } = req.query;

  if (!query || !lat || !lon || !maxDistance) {
    return res.status(400).json({ message: 'Query, latitude, longitude, and maxDistance are required.' });
  }

  try {
    const maxRadius = 25000; // 25 km in meters

    // Find shops within the specified radius
    const shops = await Shop.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lon, lat], maxRadius / 6378100]
        }
      },
      $or: [
        { 'products.name': { $regex: query, $options: 'i' } },
        { 'products.genericName': { $regex: query, $options: 'i' } }
      ]
    });

    console.log('Shops found:', shops); // Debug

    if (shops.length === 0) {
      return res.json([]);
    }

    // Prepare coordinates for OSRM API
    const destinations = shops.map(shop => `${shop.location.coordinates[0]},${shop.location.coordinates[1]}`).join(';');
    const origins = `${lon},${lat}`;

    console.log('OSRM origins:', origins); // Debug
    console.log('OSRM destinations:', destinations); // Debug

    // Call OSRM table API
    const osrmResponse = await axios.get(`${OSRM_SERVER_URL}/table/v1/driving/${origins};${destinations}`, {
      params: {
        annotations: 'distance,duration'
      }
    });

    const { distances, durations } = osrmResponse.data;

    console.log('OSRM response distances:', distances); // Debug
    console.log('OSRM response durations:', durations); // Debug

    // Filter shops based on maxDistance
    const filteredShops = shops.filter((shop, index) => {
      const distance = distances[0][index + 1];
      console.log(`Distance to shop ${shop.name}: ${distance} meters`); // Debug
      return distance <= maxDistance * 1000;
    });

    console.log('Filtered shops:', filteredShops); // Debug

    // Combine shop data with distances and durations
    const results = filteredShops.map((shop, index) => ({
      shopid: shop._id,
      name: shop.name,
      location: shop.location,
      distance: (distances[0][index + 1] / 1000).toFixed(2) + ' km',
      duration: (durations[0][index + 1] / 60).toFixed(2) + ' mins',
      products: shop.products.filter(product =>
        new RegExp(query, 'i').test(product.name) ||
        new RegExp(query, 'i').test(product.genericName)
      )
    }));

    console.log('Final results:', results); // Debug
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};
