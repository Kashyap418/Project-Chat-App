// ========================================
// MAIN SERVER FILE - Express.js Application
// ========================================
// This file sets up the main Express server, configures middleware,
// defines API routes, and serves the frontend application

// Import required dependencies
import express from "express"; // Import Express.js framework  //💡 Purpose: Create an Express application
import dotenv from "dotenv"; // Load environment variables from .env file
import cookieParser from "cookie-parser"; // Parse cookies attached to client requests
import path from "path"; // Get current directory path (needed for ES modules)

// Import route handlers for different API endpoints
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// Import database connection and socket.io setup
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// Define server port (use environment variable or default to 5000)
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

// Get current directory path (needed for ES modules)
const __dirname = path.resolve();

// ========================================
// MIDDLEWARE CONFIGURATION
// ========================================

// Parse incoming JSON payloads and make them available in req.body
app.use(express.json()); 
// 💡 Purpose: Parse JSON data from request body
// 💥 Without this: req.body will be undefined & Express won't know how to read JSON
// ✅ With this: Express automatically parses JSON and converts to JavaScript object

// Parse cookies attached to client requests
app.use(cookieParser()); 
// 💡 Purpose: Parse cookies from request headers
// 💥 Without this: req.cookies will be undefined
// ✅ With this: Express automatically parses cookies and converts to JavaScript object

// ========================================
// API ROUTES CONFIGURATION
// ========================================

// Mount authentication routes at /api/auth
app.use('/api/auth', authRoutes); 
// 💡 Handles: login, signup, logout, and authentication-related operations

// Mount message routes at /api/messages
app.use('/api/messages', messageRoutes);  
// 💡 Handles: sending, receiving, and managing chat messages

// Mount user routes at /api/users
app.use('/api/users', userRoutes);
// 💡 Handles: user profile, search, and user-related operations

// ========================================
// STATIC FILE SERVING & FRONTEND
// ========================================

// Serve static files (HTML, CSS, JS) from the frontend/dist folder
app.use(express.static(path.join(__dirname, '/frontend/dist'))); 
// 💡 Purpose: Serve the built React frontend application
// 📁 Serves files from: frontend/dist directory

// Catch-all route for client-side routing (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
// 💡 Purpose: Handle React Router routes by serving index.html for all unmatched routes
// 🔄 This enables client-side routing to work properly

// ========================================
// SERVER STARTUP
// ========================================

// Start the server and connect to database
server.listen(PORT, () => {
    // Connect to MongoDB database
    connectToMongoDB();
    console.log(`🚀 Server Running on Port: ${PORT}`);
});
// 💡 Purpose: Initialize server and establish database connection
// 🔗 Uses socket.io server instance for real-time communication