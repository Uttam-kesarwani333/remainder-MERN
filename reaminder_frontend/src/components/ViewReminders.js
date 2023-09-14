import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    const handleToggle = async (id, isEnabled) => {
        try {
            // Send a PUT request to your backend endpoint to update the enable/disable status
            await axios.put(`http://localhost:5000/reminders/${id}`, { isEnabled: !isEnabled });
            // Update the reminders list with the new enable/disable status
            setReminders((prevReminders) =>
                prevReminders.map((reminder) =>
                    reminder._id === id ? { ...reminder, isEnabled: !isEnabled } : reminder
                )
            );
        } catch (error) {
            console.error('Toggling reminder status failed:', error.message);
        }
    };

    return (
        <div>
            <h2>View Reminders</h2>
            <Link to="/reminders/create">
                <button>Create Reminder</button>
            </Link>

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
                        <strong>Status:</strong> {reminder.isEnabled ? 'Enabled' : 'Disabled'}<br />

                        {/* DELETE button */}
                        <button onClick={() => handleDelete(reminder._id)}>DELETE</button>

                        {/* EDIT button - Link to an edit page (replace '/edit' with your actual edit route) */}
                        <Link to={`/reminders/edit/${reminder._id}`}>EDIT</Link>

                        {/* Toggle switch for enable/disable */}
                        <label>
                            <input
                                type="checkbox"
                                checked={reminder.isEnabled}
                                onChange={() => handleToggle(reminder._id, reminder.isEnabled)}
                            />
                            isEnable
                        </label>

                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewReminder;
