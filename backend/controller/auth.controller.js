import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import axios from "axios";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { validationResult } from "express-validator";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const GEOCODING_URL = process.env.GEOCODING_URL;

export const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, username, password, confirmPassword, address } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: "User already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const geocodeResponse = await axios.get(GEOCODING_URL, {
            params: {
                q: address,
                format: 'json'
            }
        });
        
        if (geocodeResponse.data.length === 0) {
            return res.status(400).json({ error: "Invalid address" });
        }

        const location = {
            type: "Point",
            coordinates: [
                parseFloat(geocodeResponse.data[0].lon),
                parseFloat(geocodeResponse.data[0].lat)
            ]
        };
        
        const profilePic = "https://api.dicebear.com/8.x/bottts/svg";

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            address,
            profilePic,
            location
        });

        await newUser.save();

        const token = generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
            location,
            token,
        });

    } catch (error) {
        console.error("User Signup error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = generateTokenAndSetCookie(user._id, res);

        res.status(200).json({ user, token });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Middleware to verify token and authenticate user
// export const authMiddleware = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (!token) {
//         return res.status(401).json({ error: "No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.id;
//         next();
//     } catch (err) {
//         res.status(401).json({ error: "Invalid token" });
//     }
// };
