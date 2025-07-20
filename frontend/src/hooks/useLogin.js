// ========================================
// USE LOGIN HOOK - Authentication Logic
// ========================================
// Custom hook for handling user login functionality
// Manages login API calls, loading states, and error handling

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

/**
 * Custom hook for user login functionality
 * @returns {Object} Object containing loading state and login function
 */
const useLogin = () => {
	// Loading state for UI feedback during login process
	const [loading, setLoading] = useState(false);
	
	// Get setAuthUser function from authentication context
	const { setAuthUser } = useAuthContext();

	/**
	 * Login function that handles user authentication
	 * @param {string} username - User's username
	 * @param {string} password - User's password
	 */
	const login = async (username, password) => {
		// Validate input fields before making API call
		const success = handleInputErrors(username, password);
		if (!success) return;
		
		// Set loading state to true for UI feedback
		setLoading(true);
		
		try {
			// Make POST request to login API endpoint
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			// Parse response data
			const data = await res.json();
			
			// Check for API errors
			if (data.error) {
				throw new Error(data.error);
			}

			// Store user data in localStorage for persistence
			localStorage.setItem("chat-user", JSON.stringify(data));
			
			// Update authentication context with user data
			setAuthUser(data);
		} catch (error) {
			// Display error message to user
			toast.error(error.message);
		} finally {
			// Reset loading state regardless of success/failure
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;

/**
 * Validates login input fields
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {boolean} True if inputs are valid, false otherwise
 */
function handleInputErrors(username, password) {
	// Check if all required fields are filled
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}