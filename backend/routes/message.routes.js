import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=express.Router();

router.get('/:id',protectRoute,getMessages); //id is reciever id
router.post("/send/:id",protectRoute,sendMessage); //id is reciever id

export default router;