import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  number: { type: Number },
  password: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);