// ========================================
// USER CONTROLLER - User Management Logic
// ========================================
// This file contains the business logic for user-related operations
// Handles user data retrieval for the chat sidebar

import User from "../models/user.model.js";

/**
 * Get Users for Sidebar Controller
 * Retrieves all users except the currently logged-in user
 * Used to populate the conversation list in the chat sidebar
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getUsersForSidebar = async (req, res) => {
    try {
        // Get the ID of the currently logged-in user (added by protectRoute middleware)
        const loggedInUserId = req.user._id;
        
        // Find all users except the logged-in user and exclude password field
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        // 💡 $ne = "not equal" - excludes current user from results
        // 💡 .select("-password") - excludes password field from response

        // Return filtered users for sidebar display
        res.status(200).json(filteredUsers);
         
    } catch (error) {
        console.error("Error in getUsersForSidebar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};