import express from "express"
import cors from "cors"
import axios from "axios"
import { getDB } from "./config/db.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const modal ="openrouter/free";

app.post("/api/ask-ai", async (req, res) => {
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

app.post("/api/savechats",async(req,res)=>{
 try {
    const db = getDB()

    const data = req.body  

    const result = await db.collection("previousChats").insertOne({
      ...data,
      createdAt: new Date()
    })

    res.status(201).json({
      message: "Chat saved successfully",
      id: result.insertedId
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

app.get("/api/getchats", async (req, res) => {
  try {
    const db = getDB();

    const chats = await db
      .collection("previousChats")
      .find({})
      .sort({ createdAt: -1 }) 
      .toArray();

    res.status(200).json({
      message: "Chats fetched successfully",
      data: chats
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running ")
})

export default app