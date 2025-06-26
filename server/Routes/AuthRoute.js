const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authMiddleware = require('../Middleware/authMiddleware')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User registered", user: {
      name: user.name,
      email: user.email,
      role: user.role
    } });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT,
      { expiresIn: '1h' }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      message: "Successfull login",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }});

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get('/me', authMiddleware, (req, res) => {
  const { id, name, email, role } = req.user;
  console.log("name from backend", name);
  res.status(200).json({
    user: { id, name, email, role }
  });
});

module.exports = router;
