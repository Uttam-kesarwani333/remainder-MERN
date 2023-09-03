// DashboardButtons.js

import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardButtons.css';

function DashboardButtons() {
    return (
        <div className="dashboard-buttons-container">
            <Link to="/reminders/create" className="dashboard-button">Set Reminder</Link>
            <Link to="/reminders/modify" className="dashboard-button">Modify Reminder</Link>
            <Link to="/reminders/delete" className="dashboard-button">Delete Reminder</Link>
            <Link to="/reminders/view" className="dashboard-button">View Reminders</Link>
            {/* Add other Link components for additional routes */}
        </div>
    );
}

export default DashboardButtons;
