import React from 'react';
import './DashboardButtons.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function DashboardButtons() {
    const navigate = useNavigate();

    const navigateToSetReminder = () => {
        navigate('/set-reminder'); // Replace '/set-reminder' with the actual route you want to navigate to for setting a reminder
    };

    const navigateToModifyReminder = () => {
        navigate('/modify-reminder'); // Replace '/modify-reminder' with the actual route you want to navigate to for modifying a reminder
    };

    const navigateToDeleteReminder = () => {
        navigate('/delete-reminder'); // Replace '/delete-reminder' with the actual route you want to navigate to for deleting a reminder
    };

    const navigateToViewReminders = () => {
        navigate('/view-reminders'); // Replace '/view-reminders' with the actual route you want to navigate to for viewing reminders
    };

    return (
        <div className="dashboard-buttons-container">
            <button className="dashboard-button" onClick={navigateToSetReminder}>Set Reminder</button>
            <button className="dashboard-button" onClick={navigateToModifyReminder}>Modify Reminder</button>
            <button className="dashboard-button" onClick={navigateToDeleteReminder}>Delete Reminder</button>
            <button className="dashboard-button" onClick={navigateToViewReminders}>View Reminders</button>
            {/* Add onClick handlers and routes for other buttons */}
        </div>
    );
}

export default DashboardButtons;
