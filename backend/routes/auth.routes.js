// ========================================
// AUTHENTICATION ROUTES - User Auth Endpoints
// ========================================
// This file defines all authentication-related API routes
// Handles user registration, login, and logout functionality

import express from "express";

// Import authentication controller functions
import { signup, login, logout } from "../controllers/auth.controller.js";

// Create Express router instance
const router = express.Router(); 

// ========================================
// AUTHENTICATION ROUTES
// ========================================

// User registration endpoint
router.post("/signup", signup);
// 💡 POST /api/auth/signup
// 📝 Purpose: Create new user account
// 📤 Body: { fullName, username, password, gender, profilePic }

// User login endpoint
router.post("/login", login);
// 💡 POST /api/auth/login
// 📝 Purpose: Authenticate user and create session
// 📤 Body: { username, password }

// User logout endpoint
router.post("/logout", logout);
// 💡 POST /api/auth/logout
// 📝 Purpose: End user session and clear cookies

// 💡 Route Structure Explanation:
// - Each route connects an HTTP method + path to a controller function
// - The router is middleware that handles request routing
// - Controller functions are also middleware (receive req, res, next)
// - Controllers can handle requests or call next() to pass control

export default router;