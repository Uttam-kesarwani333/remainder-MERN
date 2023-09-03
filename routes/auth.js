const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();

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
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }

        const payload = {
            email: user.email,
            id: user._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        // // Remove the password field from the user object before sending it in the response
        user.password = undefined;

        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
});


// // Add a logout route
// router.post('/logout', (req, res) => {
//     try {








//         // Respond with a success message
//         res.json({ message: 'Logged out successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Logout failed' });
//     }
// });



// Define the route to create a reminder
router.post('/reminders', async (req, res) => {
    try {
        const { date, subject, description, email, contactNo, smsNo, recur, user } = req.body;
        const newReminder = new Reminder({ date, subject, description, email, contactNo, smsNo, recur, user });
        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create a reminder' });
    }
});
// Backend Route to Modify a Reminder
router.put('/reminders/:id', async (req, res) => {
    try {
        // Parse reminder data from the request body
        const { date, subject, description, contactNo, smsNo, recur } = req.body;

        // Find the reminder by ID and update its properties
        const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, {
            date,
            subject,
            description,
            contactNo,
            smsNo,
            recur,
        });

        if (!updatedReminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        // Respond with the updated reminder
        res.json(updatedReminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update the reminder' });
    }
});

// Backend Route to Delete a Reminder
router.delete('/reminders/:id', async (req, res) => {
    try {
        // Find the reminder by ID and delete it
        const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);

        if (!deletedReminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        // Respond with a success message
        res.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete the reminder' });
    }
});
// Backend Route to View a Reminder by ID
router.get('/reminders/:id', async (req, res) => {
    try {
        // Find the reminder by ID
        const reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        // Respond with the reminder data
        res.json(reminder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve the reminder' });
    }
});

// Backend Route to View All Reminders for a User (Assuming you want to filter by user)
router.get('/reminders/user/:userId', async (req, res) => {
    try {
        // Find all reminders for a specific user
        const reminders = await Reminder.find({ user: req.params.userId });

        // Respond with the list of reminders
        res.json(reminders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve reminders for the user' });
    }
});



module.exports = router;
