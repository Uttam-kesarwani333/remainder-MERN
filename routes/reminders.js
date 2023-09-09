const express = require('express');
const router = express.Router();
const Reminder = require('../models/Remainder');


// Create a new reminder
router.post('/create', async (req, res) => {
    try {
        const { date, time, subject, description, email, contactNo, smsNo, recur, userId } = req.body;

        const reminder = new Reminder({
            date: new Date(date), // Use the "date" field directly
            time, // Use the "time" field directly
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


// Get all reminders
router.get('/view', async (req, res) => {
    try {
        const reminders = await Reminder.find();
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
