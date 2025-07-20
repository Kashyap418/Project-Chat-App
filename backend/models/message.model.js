// ========================================
// MESSAGE MODEL - Mongoose Schema Definition
// ========================================
// This file defines the Message model schema for MongoDB using Mongoose ODM
// The schema defines the structure for chat messages between users

import mongoose from "mongoose";

/**
 * Message Schema Definition
 * Defines the structure and relationships for message documents in MongoDB
 */
const messageSchema = new mongoose.Schema(
	{
		// Reference to the user who sent the message
		senderId: {
			type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type for references
			ref: "User",                          // References the User model
			required: true,                       // Field is mandatory
		},
		
		// Reference to the user who receives the message
		receiverId: {
			type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type for references
			ref: "User",                          // References the User model
			required: true,                       // Field is mandatory
		},
		
		// The actual message content
		message: {
			type: String,
			required: true, // Field is mandatory
		},
	},
	{ 
		timestamps: true 
		// 💡 Automatically adds createdAt and updatedAt fields
		// 📅 createdAt: When message was sent
		// 🔄 updatedAt: When message was last modified (rarely used for messages)
	}
);

// Create and export the Message model
// 💡 "Message" becomes "messages" collection in MongoDB
const Message = mongoose.model("Message", messageSchema);

export default Message;