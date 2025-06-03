import { useState } from "react";
import toast from "react-hot-toast"; // to show error messages
import { useAuthContext } from "../context/AuthContext"; // to access the authentication context and set the authenticated user

// Custom hook for handling user signup
// It manages the signup process, including form validation and API requests for user registration.
// It returns the loading state and the signup function to be used in components.
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", { // API endpoint for user signup. The endpoint is expected to handle the signup logic on the server side
				method: "POST",
				headers: { "Content-Type": "application/json" }, // to tell the server that we are sending JSON data
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }), // to convert the data to JSON format so that the server can understand it
			}); //******************* */ Sending a POST request to the server with user data *************************************

			const data = await res.json(); // Parse the JSON response from the server i.e. convert the response to a JavaScript object 
            // console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}

			
			localStorage.setItem("chat-user", JSON.stringify(data)); // Store the user data in localStorage so that it persists across page reloads.
			// This allows the user to remain logged in even after refreshing the page.
			// It is a simple way to manage user sessions without using cookies or tokens.
			// It is not the most secure way, but it is sufficient for this simple application.


			setAuthUser(data); // Set the authenticated user in the context, allowing other components to access the current user information.
			//It allows global state management for authentication without prop drilling.
			// i.e when we are logged in, we want to redirect to home page of conversation
			toast.success("Signup successful!"); // Show success message to the user
			

		} catch (error) { // Handle any errors that occur during the try process, such as network issues or server errors.
			toast.error(error.message);
		} finally { // This block will always run, regardless of whether the try block succeeded or failed.
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

// Simple frontend validation before making the request:
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false; 
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}