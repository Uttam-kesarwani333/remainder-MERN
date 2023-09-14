const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
    },
    smsNo: {
        type: String,
    },
    recur: {
        type: [String],
        enum: ['7 Days', '5 Days', '3 Days', '2 Days'],
    },
    isReminded: {
        type: Boolean,  // Add this field to track if the reminder has been reminded
        default: false, // Default value is false, indicating it hasn't been reminded
    },
    isEnabled: {
        type: Boolean,
        default: true, // By default, reminders are enabled
    },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
