const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const reminderRoutes = require('./routes/reminders');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://remainder:KXZjSYxFwm9Qer7f@remainder.khpaton.mongodb.net/remainderapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// app.send("/", "Hello");

app.use('/auth', authRoutes);
app.use('/reminders', reminderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});