import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to your registration API endpoint
            const response = await axios.post('http://localhost:5000/auth/register', {
                email,
                password,
            });

            // Check if registration was successful
            if (response.status === 201) {
                console.log('User registered successfully');
                // Redirect to the login page upon successful registration
                navigate('/login');
            } else {
                console.error('Registration failed');
                // Handle the case where registration failed
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            // Handle any errors that occurred during registration
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
