import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  shopId: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  storeName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
  }
},{ timestamps: true });

export default mongoose.model('Cart', cartSchema);
