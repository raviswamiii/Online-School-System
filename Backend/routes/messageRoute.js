import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import schoolAuth from "../middleware/schoolAuth.js";

const messageRouter = express.Router();

messageRouter.post("/sendMessages", schoolAuth, sendMessage);

messageRouter.get("/getMessages/:userId", schoolAuth, getMessages);
export default messageRouter;