// ========================================
// PROTECT ROUTE MIDDLEWARE - Authentication Guard
// ========================================
// This middleware protects routes by verifying JWT tokens and authenticating users
// It ensures that only authenticated users can access protected endpoints 

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Authentication Middleware
 * Verifies JWT token from cookies and attaches user data to request object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const protectRoute = async (req, res, next) => {
	try {
		// Extract JWT token from cookies
		const token = req.cookies.jwt;

		// Check if token exists
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Verify the JWT token using the secret key
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Check if token is valid
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// Find user in database using decoded userId (exclude password field)
		const user = await User.findById(decoded.userId).select("-password");

		// Check if user exists
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Attach user data to request object for use in route handlers
		req.user = user;

		// Continue to the next middleware or route handler
		next();
	} catch (error) {
		// Handle any errors during authentication process
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;