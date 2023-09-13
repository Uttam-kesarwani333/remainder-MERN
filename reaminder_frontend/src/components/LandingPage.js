import React from 'react';
import './LandingPage.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
function LandingPage() {
    return (
        <div className="landing-container">
            <h1>Welcome to the Reminder App</h1>
            <p>Never forget an important event again!</p>

            <Link to="/login">
                <button className="get-started-button">Get Started</button>
            </Link>
        </div>
    );
}

export default LandingPage;
