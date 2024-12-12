import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number], 
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Create a 2dsphere index on the location field to support geospatial queries
userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

export default User;
