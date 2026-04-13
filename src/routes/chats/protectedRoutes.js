import express from "express"
import axios from "axios";
import Chats from "../../models/chat.modal.js";
import { aiLimiter } from "../../middlewares/limitsetterMiddleware.js";

const router = express.Router();
const modal ="openrouter/free";

router.post("/ask-ai", aiLimiter,async (req, res) => {
  const { prompt } = req.body;


    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model : "openrouter/free",
          messages: [{ role: "user", content: prompt }]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000",
            "X-Title": "chatbot-project"
          }
        }
      );

      return res.json({
        modal,
        reply: response.data.choices[0].message.content
      });

    } catch (error) {
      console.log(`Model failed: ${modal}`);
    }

});

router.post("/savechats", async (req, res) => {
  try {
    const chat = await Chats.create(req.body);

    res.status(201).json({
      message: "Chat saved successfully",
      id: chat._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getchats", async (req, res) => {
  try {
    const chats = await Chats.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Chats fetched successfully",
      data: chats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;