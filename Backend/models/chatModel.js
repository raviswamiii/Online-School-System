import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
      },
    ],
    lastMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat =
  mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
