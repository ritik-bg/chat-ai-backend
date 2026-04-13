import Users from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const createUser = async (req, res) => {

    if(!req.body) return res.status(500).json({ error: "body cant be empty" }); 

    try {
    const { name, number, password } = req.body;

    // const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      number,
      password: password,
    });

    res.status(201).json({ message: 'User created!', user });
  } catch (err) {
    console.log(err,"error");
    
    res.status(500).json({ error: err.message });
  }
};


export const signIn = async(req, res) => {
  try {
    const { number, password } = req.body;


    const user = await Users.findOne({ number });
    if (!user) return res.status(400).json({ message: 'Invalid number' });

    const match = await (password === user.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};