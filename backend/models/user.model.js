// ========================================
// USER MODEL - Mongoose Schema Definition
// ========================================
// This file defines the User model schema for MongoDB using Mongoose ODM
// The schema defines the structure and validation rules for user data

import mongoose from "mongoose";

/**
 * User Schema Definition
 * Defines the structure and validation rules for user documents in MongoDB
 */
const userSchema = new mongoose.Schema(
	{
		// User's full name (first and last name)
		fullName: {
			type: String,
			required: true, // Field is mandatory
		},
		
		// Unique username for login and identification
		username: {
			type: String,
			required: true, // Field is mandatory
			unique: true,   // Ensures no duplicate usernames in database
		},
		
		// Hashed password for authentication
		password: {
			type: String,
			required: true,    // Field is mandatory
			minlength: 6,      // Minimum 6 characters for security
		},
		
		// User's gender selection
		gender: {
			type: String,
			required: true,                    // Field is mandatory
			enum: ["male", "female"],          // Only these values are allowed
		},
		
		// URL or path to user's profile picture
		profilePic: {
			type: String,
			default: "",                       // Empty string if no profile pic
		},
	},
	{ 
		timestamps: true 
		// 💡 Automatically adds createdAt and updatedAt fields
		// 📅 createdAt: When user account was created
		// 🔄 updatedAt: When user data was last modified
	}
);

// Create and export the User model
// 💡 "User" becomes "users" collection in MongoDB (Mongoose pluralizes automatically)
const User = mongoose.model("User", userSchema);

export default User;