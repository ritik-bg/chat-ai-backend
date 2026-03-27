import { MongoClient } from "mongodb"

let db

const connectDB = async () => {
  
  try {
    const client = new MongoClient(process.env.MONGO_URI)

    await client.connect()

    db = client.db(process.env.DB_NAME)

    console.log("✅ MongoDB Connected")
  } catch (error) {
    console.error("❌ DB Error:", error.message)
    process.exit(1)
  }
}

const getDB = () => {
  if (!db) {
    throw new Error("DB not initialized. Call connectDB first.")
  }
  return db
}

export { connectDB, getDB }