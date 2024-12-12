import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genericName: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String, 
    required: true
  }
});

const Medicine = mongoose.model('Medicine', MedicineSchema);

export default Medicine;
