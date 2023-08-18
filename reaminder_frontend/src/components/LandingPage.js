import React from 'react';
import './LandingPage.css'; // Import the CSS file for styling

function LandingPage() {
    return (
        <div className="landing-container">
            <h1>Welcome to the Reminder App</h1>
            <p>Never forget an important event again!</p>
            <button className="get-started-button">Get Started</button>
        </div>
    );
}

export default LandingPage;
