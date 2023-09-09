import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ViewReminder() {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        // Fetch reminders from the backend API
        axios.get('http://localhost:5000/reminders/view')
            .then((response) => {
                setReminders(response.data);
            })
            .catch((error) => {
                console.error('Fetching reminders failed:', error.message);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            // Send a DELETE request to your backend endpoint to delete the reminder
            await axios.delete(`http://localhost:5000/reminders/${id}`);
            // Update the reminders list by filtering out the deleted reminder
            setReminders((prevReminders) => prevReminders.filter((reminder) => reminder._id !== id));
        } catch (error) {
            console.error('Deleting reminder failed:', error.message);
        }
    };

    return (
        <div>
            <h2>View Reminders</h2>
            <ul>
                {reminders.map((reminder) => (
                    <li key={reminder._id}>
                        <strong>Date:</strong> {new Date(reminder.date).toLocaleString()}<br />
                        <strong>Subject:</strong> {reminder.subject}<br />
                        <strong>Description:</strong> {reminder.description}<br />
                        <strong>Email:</strong> {reminder.email}<br />
                        <strong>Contact Number:</strong> {reminder.contactNo}<br />
                        <strong>SMS Number:</strong> {reminder.smsNo}<br />
                        <strong>Recurrence:</strong> {reminder.recur.join(', ')}<br />

                        {/* DELETE button */}
                        <button onClick={() => handleDelete(reminder._id)}>DELETE</button>

                        {/* EDIT button - Link to an edit page (replace '/edit' with your actual edit route) */}
                        <Link to={`/edit/${reminder._id}`}>EDIT</Link>

                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewReminder;
