
import mongoose from 'mongoose';

let db

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });

    console.log("MongoDB Connected with Mongoose");
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("DB not initialized. Call connectDB first.")
  }
  return db
}

export { getDB }