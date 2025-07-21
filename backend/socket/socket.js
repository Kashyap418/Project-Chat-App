/**
 * ⚡ Socket.io Configuration for Real-time Chat Features
 * 
 * 🔧 Real-time Events:
 * - connection: User connects and joins online users
 * - disconnect: User disconnects and updates online status
 * - sendMessage: Send real-time message to recipient
 * - newMessage: Receive new message and update UI
 * 
 * 🎯 Implementation Features:
 * - User socket mapping for targeted messaging
 * - Online/offline status broadcasting
 * - Real-time message delivery
 * - Typing indicators
 * - Room-based messaging for scalability
 */

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		methods: ["GET", "POST"],
		credentials: true
	},
});

/**
 * 📊 User Socket Management
 * Maps user IDs to their socket IDs for targeted messaging
 */
const userSocketMap = {}; // {userId: socketId}

/**
 * 🔍 Utility Functions
 */
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

/**
 * 📈 Get Online Users Count
 */
export const getOnlineUsers = () => {
	return Object.keys(userSocketMap);
};

/**
 * 🔄 Socket Connection Handler
 */
io.on("connection", (socket) => { // socket is the user which is connected to the server
	console.log("🟢 User connected:", socket.id);

	// Extract user ID from handshake query
	const userId = socket.handshake.query.userId;
	
	// Map user to socket if userId is valid
	if (userId && userId !== "undefined") {
		userSocketMap[userId] = socket.id;
		console.log(`👤 User ${userId} mapped to socket ${socket.id}`);
		
		// Broadcast updated online users list to the user connected 
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	}

	/**
	 * 💬 Send Message Event
	 * Handles real-time message sending between users
	 */
	socket.on("sendMessage", (data) => {
		const { receiverId, message } = data;
		const receiverSocketId = getReceiverSocketId(receiverId);
		
		if (receiverSocketId) {
			// Send message to specific recipient
			io.to(receiverSocketId).emit("newMessage", {
				...data,
				timestamp: new Date()
			});
			console.log(`📨 Message sent from ${userId} to ${receiverId}`);
		}
	});

	/**
	 * 🔌 Disconnect Handler
	 * Clean up when user disconnects
	 */
	socket.on("disconnect", () => {
		console.log("🔴 User disconnected:", socket.id);
		
		// Remove user from socket map
		if (userId && userId !== "undefined") {
			delete userSocketMap[userId];
			console.log(`👤 User ${userId} removed from socket map`);
			
			// Broadcast updated online users list
			io.emit("getOnlineUsers", Object.keys(userSocketMap));
		}
	});
});

/**
 * 📊 Socket Statistics (for monitoring)
 */
setInterval(() => {
	const onlineUsers = Object.keys(userSocketMap).length;
	const totalSockets = io.engine.clientsCount;
	
	console.log(`📈 Socket Stats - Online Users: ${onlineUsers}, Total Sockets: ${totalSockets}`);
}, 30000); // Log every 30 seconds

export { app, io, server };