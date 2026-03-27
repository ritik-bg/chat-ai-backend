import dotenv from "dotenv"
dotenv.config({ path: "../.env" });
import app from "./app.js"
import { connectDB } from "./config/db.js"


const PORT = process.env.PORT || 5000


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message)
  process.exit(1)
})

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message)
  process.exit(1)
})

const startServer = async () => {
  try {
    await connectDB()

    const server = app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`)
    })

    // Graceful shutdown
    process.on("SIGINT", () => {
      console.log(" Shutting down server...")
      server.close(() => {
        process.exit(0)
      })
    })

  } catch (error) {
    console.error("Server start failed:", error.message)
    process.exit(1)
  }
}

startServer()