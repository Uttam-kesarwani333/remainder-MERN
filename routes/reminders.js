const express = require('express');
const router = express.Router();
const Reminder = require('../models/Remainder');

// Create a new reminder
router.post('/create', async (req, res) => {
    try {
        const { date, subject, description, email, contactNo, smsNo, recur, userId } = req.body;
        const reminder = new Reminder({
            date,
            subject,
            description,
            email,
            contactNo,
            smsNo,
            recur,
            user: userId,
        });
        await reminder.save();
        res.status(201).json(reminder);
    } catch (error) {
        res.status(500).json({ message: 'Creating reminder failed' });
    }
});

// Get all reminders for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const reminders = await Reminder.find({ user: userId });
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: 'Fetching reminders failed' });
    }
});

// Update a reminder
router.put('/:id', async (req, res) => {
    try {
        const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(reminder);
    } catch (error) {
        res.status(500).json({ message: 'Updating reminder failed' });
    }
});

// Delete a reminder
router.delete('/:id', async (req, res) => {
    try {
        await Reminder.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reminder deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Deleting reminder failed' });
    }
});

module.exports = router;
