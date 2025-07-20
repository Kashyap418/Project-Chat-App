// ========================================
// SOCKET CONTEXT - Real-time Communication
// ========================================
// This context manages Socket.IO connection for real-time messaging
// Handles online users tracking and socket connection lifecycle

import { createContext } from "react";
import { useAuthContext } from "./AuthContext";
import { useEffect, useState, useContext } from "react";
import io from "socket.io-client";

// Create the socket context
const SocketContext = createContext();

/**
 * Custom hook to access socket context
 * Provides socket instance and online users list
 * @returns {Object} Socket context with socket and onlineUsers
 */
export const useSocketContext = () => {
    return useContext(SocketContext);
};

/**
 * Socket Context Provider Component
 * Manages Socket.IO connection and online users state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Context provider component
 */
export const SocketContextProvider = ({ children }) => {
    // Socket.IO connection instance
    const [socket, setSocket] = useState(null);
    
    // List of currently online users
    const [onlineUsers, setOnlineUsers] = useState([]);
    
    // Get authenticated user from auth context
    const { authUser } = useAuthContext();

    // Effect to manage socket connection based on authentication
    useEffect(() => {
        if (authUser) {
            // Create socket connection when user is authenticated
            const socket = io("https://chat-app-production-7h2c.onrender.com/", {
                query: {
                    userId: authUser._id, // Pass user ID for server-side mapping
                }
            });

            // Store socket instance in state
            setSocket(socket);

            // Listen for online users updates from server
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Cleanup: close socket connection on unmount
            return () => socket.close();
        } else {
            // Close socket connection when user logs out
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // Re-run effect when authUser changes

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

// 💡 Socket Features:
// - Real-time message delivery
// - Online users tracking
// - Automatic connection management
// - Clean disconnection on logout