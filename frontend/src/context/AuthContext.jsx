// ========================================
// AUTHENTICATION CONTEXT - User State Management
// ========================================
// This context provides authentication state throughout the React application
// Allows sharing logged-in user data across all components without prop drilling
// Manages selected conversation and messages across the application

import { useContext, useState } from "react";
import { createContext } from "react";

// Create the authentication context
export const AuthContext = createContext();

/**
 * Custom hook to access authentication context
 * Simplifies context consumption in components
 * @returns {Object} Authentication context with authUser and setAuthUser
 */
export const useAuthContext = () => { 
    return useContext(AuthContext);
};

/**
 * Authentication Context Provider Component
 * Manages user authentication state and provides it to all child components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Context provider component
 */
export const AuthContextProvider = ({ children }) => {
    // Initialize auth state from localStorage or null
    // 💡 Persists user session across browser refreshes
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("chat-user")) || null
    );
    // Conversation state
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, selectedConversation, setSelectedConversation, messages, setMessages }}>
            {children}
        </AuthContext.Provider>
    );
};

// 💡 Context Benefits:
// - Eliminates prop drilling for user data
// - Centralized authentication state management
// - Easy access to user info from any component
// - Automatic re-renders when auth state changes