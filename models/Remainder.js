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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;