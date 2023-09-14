import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewReminder.css';

function ViewReminder() {
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        // Fetch reminders from the backend API
        axios
            .get('http://localhost:5000/reminders/view')
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
        <div className="view-reminder-container">
            <h2>View Reminders</h2>
            <Link to="/reminders/create" className="button-link">
                <button className="create-button">Create Reminder</button>
            </Link>
            <Link to="/login" className="button-link">
                <button className="logout-button">Logout</button>
            </Link>

            <ul className="reminder-list">
                {reminders.map((reminder) => (
                    <li key={reminder._id} className="reminder-item">
                        <div className="reminder-header">
                            <strong>Date:</strong> {new Date(reminder.date).toLocaleString()}
                        </div>
                        <div className="reminder-content">
                            <strong>Subject:</strong> {reminder.subject}<br />
                            <strong>Description:</strong> {reminder.description}<br />
                            <strong>Recurrence:</strong> {reminder.recur.join(', ')}<br />
                            <strong>Status:</strong> {reminder.isEnabled ? 'Enabled' : 'Disabled'}
                        </div>

                        {/* DELETE button */}
                        <button className="delete-button" onClick={() => handleDelete(reminder._id)}>
                            DELETE
                        </button>

                        {/* EDIT button */}
                        <Link to={`/reminders/edit/${reminder._id}`} className="button-link edit-button">
                            EDIT
                        </Link>

                        {/* Toggle switch for enable/disable */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewReminder;
