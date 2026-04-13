import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    prompt: String,
    reply: String,
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema, "previousChats");