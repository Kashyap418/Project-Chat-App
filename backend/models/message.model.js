import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId, //thats how we say this will be a reference
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
	// createdAt, updatedAt -> Auto created by mongoose becoc of field { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;