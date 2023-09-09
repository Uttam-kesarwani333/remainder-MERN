import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateReminder.css'; // Import your CSS file

function CreateReminder() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState(''); // Add state for time
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
    const [recur, setRecur] = useState([]);
    const [user, setUser] = useState(''); // You should handle user authentication to get the user ID or token

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(date, time);
        try {
            // Check if required fields are filled
            if (!date || !time || !subject || !email) {
                console.error('Please fill in all required fields.');
                return;
            }

            // Combine date and time into a single datetime string in ISO format
            const dateTime = new Date(`${date}T${time}:00`).toISOString();
            // console.log(dateTime);

            // Send a POST request to your backend endpoint for creating a reminder
            const response = await axios.post('http://localhost:5000/reminders/create', {
                date: dateTime, // Use the combined datetime
                subject,
                description,
                email,
                contactNo,
                smsNo,
                recur,
                userId: user, // Updated the field name to 'userId'
            });

            // Check if reminder creation was successful
            if (response.status === 201) {
                console.log('Reminder created successfully');
                // Redirect to a different route after successful creation
                navigate('/reminders/view');
                // Clear the form fields
                setDate('');
                setTime('');
                setSubject('');
                setDescription('');
                setEmail('');
                setContactNo('');
                setSmsNo('');
                setRecur([]);
                setUser('');
            } else {
                console.error('Reminder creation failed');
                // Handle the case where reminder creation failed
            }
        } catch (error) {
            console.error('Reminder creation failed:', error.message);
            // Handle any errors that occurred during reminder creation
        }
    };

    return (
        <div className="create-reminder-container">
            <h2>Create Reminder</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Contact Number:</label>
                    <input
                        type="tel"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>SMS Number:</label>
                    <input
                        type="tel"
                        value={smsNo}
                        onChange={(e) => setSmsNo(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Recurrence:</label>
                    <select
                        multiple
                        value={recur}
                        onChange={(e) => setRecur(Array.from(e.target.selectedOptions, option => option.value))}
                    >
                        <option value="7 Days">7 Days</option>
                        <option value="5 Days">5 Days</option>
                        <option value="3 Days">3 Days</option>
                        <option value="2 Days">2 Days</option>
                    </select>
                </div>

                {/* User field is typically handled through authentication */}
                {/* <div className="form-group">
                    <label>User:</label>
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                </div> */}

                <button type="submit">Create Reminder</button>
            </form>
        </div>
    );
}

export default CreateReminder
