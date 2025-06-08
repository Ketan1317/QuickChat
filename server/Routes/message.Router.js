import express from "express";
import { protectRoute } from "../Middleware/auth.js";
import { getAllUsers, getMessages, markMessageSeen, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute,getAllUsers)
messageRouter.get("/:id",protectRoute,getMessages);
messageRouter.put("mark/:id",protectRoute,markMessageSeen);
messageRouter.post("/send/:id",protectRoute,sendMessage)
export default messageRouter;