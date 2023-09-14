import React from 'react';
import axios from 'axios';

function LogoutButton() {
    const handleLogout = async () => {
        try {
            // Make a request to the logout route on your backend
            const response = await axios.post('http://localhost:5000/auth/logout');

            if (response.status === 200) {
                // Clear any user-related state or tokens in your frontend
                // Redirect to the login page or any other desired page
                window.location.href = '/login'; // Redirect to the login page
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
