// ========================================
// MONGODB DATABASE CONNECTION
// ========================================
// This file handles the connection to MongoDB database using Mongoose ODM
// Mongoose provides a straight-forward, schema-based solution to model application data

import mongoose from "mongoose";

/**
 * Connects to MongoDB database using the connection string from environment variables
 * @returns {Promise<void>} - Returns a promise that resolves when connection is established
 */
const connectToMongoDB = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        // Handle connection errors and log them for debugging
        console.log("❌ Error while connecting to MongoDB:", error.message);
    }
};

// Export the connection function to be used in server.js
export default connectToMongoDB;