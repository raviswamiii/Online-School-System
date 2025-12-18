import Chat from "../models/chatModel.js";

export const createOrGetChat = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        members: [senderId, receiverId],
      });
    }

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
