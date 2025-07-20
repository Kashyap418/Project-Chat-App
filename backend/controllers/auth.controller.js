// ========================================
// AUTHENTICATION CONTROLLER - User Auth Logic
// ========================================
// This file contains the business logic for user authentication
// Handles user registration, login, and logout operations

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

/**
 * User Registration Controller
 * Creates a new user account with hashed password and profile picture
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const signup = async (req, res) => {
    try {
        // Extract user data from request body
        const { fullName, username, password, confirmPassword, gender } = req.body;
        
        // Validate password confirmation
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords dont match' });
        }
        
        // Check if username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash password for security (salt rounds: 10)
        const salt = await bcrypt.genSalt(10); // Higher value = more secure but slower 
        // 💡 Purpose: Generate a salt for password hashing
        // 💥 Without this: Same password will always hash to the same value
        // ✅ With this: Each password is hashed with a unique salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile picture URL based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user object
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        // Save user to database and generate authentication token
        if (newUser) {
            // Generate JWT token and set as HTTP-only cookie
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            // Return user data (excluding password)
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * User Login Controller
 * Authenticates user credentials and creates session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
    try {
        // Extract login credentials from request body
        const { username, password } = req.body;
        
        // Find user by username
        const user = await User.findOne({ username });
        
        // Compare provided password with hashed password in database
        const checkPassword = await bcrypt.compare(password, user?.password || '');

        // Validate credentials
        if (!user || !checkPassword) {
            return res.status(400).json({ error: "Invalid username or password!" });
        }
        
        // Generate JWT token and set as HTTP-only cookie
        generateTokenAndSetCookie(user._id, res);

        // Return user data (excluding password)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * User Logout Controller
 * Clears authentication cookie and ends user session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const logout = (req, res) => {
    try {
        // Clear JWT cookie by setting it to empty string with 0 maxAge
        res.cookie("jwt", "", { maxAge: 0 }); // Remove token from cookie
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};