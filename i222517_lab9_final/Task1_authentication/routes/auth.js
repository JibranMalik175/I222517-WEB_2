const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a New User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        const user = await newUser.save();
        res.status(201).json({ message: "User registered successfully!", user: { id: user._id, username: user.username, email: user.email }});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        // Validate credentials
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate JWT
        const payload = {
            userId: user._id,
            username: user.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });

        res.status(200).json({ token, message: "Logged in successfully", user: payload });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
