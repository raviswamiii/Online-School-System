import Message from "../models/messageModel.js";
import { getIO } from "../socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.school.id; 

    if (!receiverId || !text) {
      return res.status(400).json({
        success: false,
        message: "Receiver and message text are required",
      });
    }

    const roomId = [senderId, receiverId].sort().join("_");

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      roomId,
      text,
    });

    const io = getIO();
    io.to(roomId).emit("receiveMessage", message);
    io.to(receiverId.toString()).emit("receiveMessage", message);
    
    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.school.id;
    const { userId } = req.params;

    const roomId = [senderId, userId].sort().join("_");

    const messages = await Message.find({ roomId })
      .populate("sender", "name avatar")
      .populate("receiver", "name avatar")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
