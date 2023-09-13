import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardButtons.css';

function DashboardButtons() {
    const currentDate = new Date().toLocaleDateString(); // Get today's date

    return (
        <div className="dashboard-buttons-container">
            <h2>Welcome to ReminderApp</h2>
            <h3>Today's Date: {currentDate}</h3>

            <Link to="/reminders/create" className="dashboard-button">
                <div className="button-content">
                    <i className="fas fa-plus"></i>
                    <span>Create Reminder</span>
                </div>
            </Link>

            <Link to="/reminders/view" className="dashboard-button">
                <div className="button-content">
                    <i className="fas fa-eye"></i>
                    <span>View Reminders</span>
                </div>
            </Link>
            {/* Add other Link components for additional routes */}
        </div>
    );
}

export default DashboardButtons;
