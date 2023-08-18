import React from 'react';

function ReminderItem({ reminder }) {
    return (
        <div className="reminder-item-container">
            <h3>Reminder</h3>
            <p><strong>Date:</strong> {reminder.date}</p>
            <p><strong>Subject:</strong> {reminder.subject}</p>
            <p><strong>Description:</strong> {reminder.description}</p>
            <p><strong>Email:</strong> {reminder.email}</p>
            <p><strong>Contact No:</strong> {reminder.contactNo}</p>
            <p><strong>SMS No:</strong> {reminder.smsNo}</p>
            <p><strong>Recur:</strong> {reminder.recur.join(', ')}</p>
        </div>
    );
}

export default ReminderItem;
