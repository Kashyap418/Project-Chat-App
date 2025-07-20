// ========================================
// MESSAGE CONTROLLER - Chat Message Logic
// ========================================
// This file contains the business logic for sending and retrieving messages
// Handles conversation creation, message storage, and real-time delivery

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

/**
 * Send Message Controller
 * Creates or finds conversation between sender and receiver, then sends message
 * Also handles real-time message delivery via Socket.IO
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const sendMessage = async (req, res) => {
	try {
		// Extract message content and receiver ID
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id; // Added by protectRoute middleware

		// Find existing conversation between sender and receiver
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] }, // Both users must be participants
		});

		// Create new conversation if none exists
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// Create new message object
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		// Add message ID to conversation's messages array
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// Save both conversation and message in parallel for better performance
		await Promise.all([conversation.save(), newMessage.save()]);

		// ========================================
		// REAL-TIME MESSAGE DELIVERY
		// ========================================
		// Send message to receiver via Socket.IO if they're online
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() sends events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		// Return the created message
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**
 * Get Messages Controller
 * Retrieves all messages in a conversation between two users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getMessages = async (req, res) => {
	try {
		// Extract receiver ID from URL parameters
		const { id: userToChatId } = req.params; // Basically receiver ID
		const senderId = req.user._id; // Added by protectRoute middleware

		// Find conversation between sender and receiver
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] }, // Both users must be participants
		}).populate("messages"); // Populate actual message objects, not just references

		// Return empty array if no conversation exists
		if (!conversation) return res.status(200).json([]); 

		// Extract messages from conversation
		const messages = conversation.messages;

		// Return all messages in the conversation
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};