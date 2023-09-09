import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardButtons.css';

function DashboardButtons() {
    return (
        <div className="dashboard-buttons-container">
            <Link to="/reminders/create" className="dashboard-button">
                <div className="button-content">
                    <i className="fas fa-plus"></i>
                    <span>Create Reminder</span>
                </div>
            </Link>
            <Link to="/reminders/modify" className="dashboard-button">
                <div className="button-content">
                    <i className="fas fa-edit"></i>
                    <span>Modify Reminder</span>
                </div>
            </Link>
            <Link to="/reminders/delete" className="dashboard-button">
                <div className="button-content">
                    <i className="fas fa-trash"></i>
                    <span>Delete Reminder</span>
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
