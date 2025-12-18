import express from "express";
import { createOrGetChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/create", createOrGetChat);

export default router;
