const express = require('express');
const router = express.Router();
const Reminder = require('../models/Remainder');

// Create a new reminder
router.post('/create', async (req, res) => {
    try {
        const { date, time, subject, description, email, contactNo, smsNo, recur, isEnabled } = req.body;

        // Check if the reminder is enabled
        if (!isEnabled) {
            // If it's disabled, simply save the reminder without sending notifications
            const reminder = new Reminder({
                date: new Date(date), // Use the "date" field directly
                time, // Use the "time" field directly
                subject,
                description,
                email,
                contactNo,
                smsNo,
                recur,
                isEnabled,
            });

            await reminder.save();
            res.status(201).json(reminder);
        } else {
            // If it's enabled, proceed to send notifications
            const reminder = new Reminder({
                date: new Date(date), // Use the "date" field directly
                time, // Use the "time" field directly
                subject,
                description,
                email,
                contactNo,
                smsNo,
                recur,
                isEnabled,
            });

            // Implement notification logic here (e.g., using Twilio)
            // Send notifications to the specified contacts

            // After sending notifications, save the reminder
            await reminder.save();
            res.status(201).json(reminder);
        }
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







router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { isEnabled, ...updatedReminderData } = req.body;

    try {
        // Update the reminder in your MongoDB database using Mongoose
        // Make sure to validate and sanitize the data before updating
        const updatedReminder = await Reminder.findByIdAndUpdate(id, { ...updatedReminderData, isEnabled }, { new: true });

        if (!updatedReminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }

        res.json(updatedReminder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update reminder' });
    }
});




// Get a reminder by ID
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reminder = await Reminder.findById(id);
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }
        res.json(reminder);
    } catch (error) {
        res.status(500).json({ message: 'Fetching reminder failed' });
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
