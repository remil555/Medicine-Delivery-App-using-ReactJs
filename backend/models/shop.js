// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     genericName: { type: String, required: true },
//     manufacturer: { type: String, required: true },
//     price: { type: Number, required: true },
//     rating: { type: Number, required: true }
// });

// const shopSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     location: {
//         type: { type: String, enum: ['Point'], required: true },
//         coordinates: { type: [Number], required: true }
//     },
//     products: [productSchema]
// });

// shopSchema.index({ location: '2dsphere' });

// const Shop = mongoose.model('Shop', shopSchema);

// export default Shop;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genericName: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true }
});

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    products: [productSchema]
});

shopSchema.index({ location: '2dsphere' });

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
