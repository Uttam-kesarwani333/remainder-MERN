import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import DashboardButtons from './DashboardButtons'; // Import your DashboardButtons component

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // State variable to track login status

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to your login API endpoint
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });

            // Check if login was successful
            if (response.status === 200) {
                console.log('Logged in successfully');
                setLoggedIn(true); // Set loggedIn to true upon successful login
                // You can also handle redirection to the dashboard or show a success message here
            } else {
                console.error('Login failed');
                // Handle the case where login failed
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            // Handle any errors that occurred during login
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // Add validation as needed
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required // Add validation as needed
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            {loggedIn && <DashboardButtons />} {/* Conditionally render DashboardButtons if logged in */}
        </div>
    );
}

export default Login;
