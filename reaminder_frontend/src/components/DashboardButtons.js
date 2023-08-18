import React from 'react';
import './DashboardButtons.css'; // Import the CSS file for styling

function DashboardButtons() {
    return (
        <div className="dashboard-buttons-container">
            <button className="dashboard-button">Set Reminder</button>
            <button className="dashboard-button">Modify Reminder</button>
            <button className="dashboard-button">Disable Reminder</button>
            <button className="dashboard-button">Delete Reminder</button>
            <button className="dashboard-button">Enable Reminder</button>
            <button className="dashboard-button">View your Reminders</button>
            <button className="dashboard-button logout-button">Log out</button>
        </div>
    );
}

export default DashboardButtons;
