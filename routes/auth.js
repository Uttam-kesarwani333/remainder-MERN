const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config()

// User registration
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user already exist 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            })
        }
        const user = new User({ email, password });
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: user
        });
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }
        const payload = {
            email: user.email,
            id: user._id
        };



        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });


        user = user.toObject();
        user.token = token;
        user.password = undefined;


        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
});


module.exports = router;
