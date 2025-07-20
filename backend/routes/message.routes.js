// ========================================
// MESSAGE ROUTES - Chat Message Endpoints
// ========================================
// This file defines all message-related API routes
// Handles sending and retrieving chat messages between users

import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

// Create Express router instance
const router = express.Router();

// ========================================
// MESSAGE ROUTES (Protected by Authentication)
// ========================================

// Get conversation messages with a specific user
router.get('/:id', protectRoute, getMessages);
// 💡 GET /api/messages/:id
// 📝 Purpose: Retrieve all messages between current user and specified user
// 🔒 Protected: Requires valid JWT token
// 📍 :id = receiver's user ID
// 📤 Response: Array of message objects

// Send a message to a specific user
router.post("/send/:id", protectRoute, sendMessage);
// 💡 POST /api/messages/send/:id
// 📝 Purpose: Send a new message to specified user
// 🔒 Protected: Requires valid JWT token
// 📍 :id = receiver's user ID
// 📤 Body: { message: "message content" }
// 📤 Response: Created message object

// 💡 Authentication Flow:
// - protectRoute middleware verifies JWT token before allowing access
// - If token is invalid, returns 401 Unauthorized
// - If token is valid, attaches user data to req.user and continues

export default router;