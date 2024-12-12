import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  discount: { type: Number, required: true }, 
  status: { type: String, required: true, enum: ['not used', 'used'], default: 'not used' }
},{ timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
