// ========================================
// JWT TOKEN GENERATOR - Authentication Utility
// ========================================
// This utility generates JWT tokens and sets secure HTTP-only cookies
// Used for user authentication and session management

import jwt from 'jsonwebtoken';

/**
 * Generates JWT token and sets it as an HTTP-only cookie
 * @param {string} userId - The user ID to embed in the token
 * @param {Object} res - Express response object for setting cookies
 */
const generateTokenAndSetCookie = (userId, res) => {
    // Create JWT token with user ID as payload
    const token = jwt.sign(
        { userId },                    // Payload: data embedded in the token
        process.env.JWT_SECRET,        // Secret key for signing the token
        {
            expiresIn: '15d'           // Token expires in 15 days
        }
    );
    
    // 💡 JWT Token Structure:
    // - Payload: Contains userId for user identification
    // - Secret: Used to sign and verify token authenticity
    // - Expiration: Prevents indefinite access
 
    // Set JWT token as HTTP-only cookie with security settings
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days in milliseconds /💡 Purpose: Set cookie expiration time
        httpOnly: true,                     // Prevents XSS attacks by blocking JavaScript access /💡 Purpose: Prevent JavaScript access to the cookie 
        sameSite: 'strict',                 // Prevents CSRF attacks by restricting cross-site requests
        secure: process.env.NODE_ENV !== "development"  // HTTPS only in production /💡 Purpose: Ensure secure transmission of cookies  
    });
    
    // 🔒 Security Features:
    // - httpOnly: Cookie not accessible via JavaScript (XSS protection)
    // - sameSite: 'strict': Cookie only sent in same-site requests (CSRF protection)
    // - secure: Cookie only sent over HTTPS in production
};

export default generateTokenAndSetCookie;