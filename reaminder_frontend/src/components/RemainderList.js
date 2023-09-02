import React from 'react';

function ReminderList({ reminders }) {
    return (
        <div className="reminder-list-container">
            <h2>Reminder List</h2>
            <ul>
                {reminders.map((reminder) => (
                    <li key={reminder.id}>
                        <strong>Date:</strong> {reminder.date}<br />
                        <strong>Subject:</strong> {reminder.subject}<br />
                        <strong>Description:</strong> {reminder.description}<br />
                        <strong>Email:</strong> {reminder.email}<br />
                        <strong>Contact No:</strong> {reminder.contactNo}<br />
                        <strong>SMS No:</strong> {reminder.smsNo}<br />
                        <strong>Recur:</strong> {reminder.recur.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ReminderList;
