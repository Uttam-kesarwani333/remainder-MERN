const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User registration
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        res.json({ user: user, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
});

module.exports = router;
