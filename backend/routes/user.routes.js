// ========================================
// USER ROUTES - User Management Endpoints
// ========================================
// This file defines all user-related API routes
// Handles user data retrieval and management functionality

import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

// Create Express router instance
const router = express.Router();

// ========================================
// USER ROUTES (Protected by Authentication)
// ========================================

// Get all users for sidebar display (excluding current user)
router.get('/', protectRoute, getUsersForSidebar);
// 💡 GET /api/users
// 📝 Purpose: Retrieve list of all users for chat sidebar
// 🔒 Protected: Requires valid JWT token
// 📤 Response: Array of user objects (excluding current user)
// 🎯 Used for: Populating conversation list in frontend sidebar

// 💡 Authentication Flow:
// - protectRoute middleware verifies JWT token before allowing access
// - If token is invalid, returns 401 Unauthorized
// - If token is valid, attaches user data to req.user and continues

export default router; 