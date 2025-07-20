// ========================================
// CONVERSATION MODEL - Mongoose Schema Definition
// ========================================
// This file defines the Conversation model schema for MongoDB using Mongoose ODM
// The schema manages chat conversations between users and their associated messages

import mongoose from "mongoose";

/**
 * Conversation Schema Definition
 * Defines the structure for conversation documents that group messages between users
 */
const conversationSchema = new mongoose.Schema(
	{
		// Array of users participating in the conversation
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type for references
				ref: "User",                          // References the User model
			},
		],
		
		// Array of messages in this conversation
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type for references
				ref: "Message",                       // References the Message model
				default: [],                          // Empty array by default
			},
		],
	},
	{ 
		timestamps: true 
		// 💡 Automatically adds createdAt and updatedAt fields
		// 📅 createdAt: When conversation was started
		// 🔄 updatedAt: When last message was added to conversation
	}
);

// Create and export the Conversation model
// 💡 "Conversation" becomes "conversations" collection in MongoDB
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;