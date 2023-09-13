const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const reminderRoutes = require('./routes/reminders');
const twilio = require('twilio');
const Reminder = require('./models/Remainder');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
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

console.log("MMM111");

var temp = 1;
setInterval(() => {
    const now = new Date(); // Current date and time

    Reminder.find({ isReminded: false }) // Find reminders that have not been reminded yet
        .exec()
        .then((reminderList) => {
            // console.log('Reminder list:', reminderList);

            if (reminderList) {
                reminderList.forEach(async (reminder) => { // Use async here
                    const reminderDate = new Date(reminder.date); // Convert reminder date from string to Date object

                    // Compare reminder date with current date

                    if (reminderDate - now < 0) {
                        try {
                            const remindObj = await Reminder.findByIdAndUpdate(
                                reminder._id,
                                { isReminded: true }
                            );

                            const accountSid = process.env.ACCOUNT_SID;
                            const authToken = process.env.AUTH_TOKEN;
                            const client = require('twilio')(accountSid, authToken);
                            const message = await client.messages.create({
                                body: remindObj.subject,
                                from: 'whatsapp:+14155238886',
                                to: 'whatsapp:+917607771027'
                            });

                            console.log(`Message SID: ${message.sid}`);
                        } catch (err) {
                            console.error('Error:', err.message);
                        }
                    }
                });
            }
        })
        .catch((err) => {
            console.error('Fetching reminders failed:', err.message);
        });
}, 1000);

console.log("MMM222");



// const accountSid = 'AC1f800613f01217b060b772d845de43ca';
// const authToken = 'd2dc6b7612f5c6945449d14dd56bd22b';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'Hey This is uttam this side',
//         from: '+12407644394',
//         to: '+917607771027'
//     }).then(message => console.log(`Message SID: ${message.sid}`))
// .catch(error => console.error(`Error sending message: ${error.message}`));







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});