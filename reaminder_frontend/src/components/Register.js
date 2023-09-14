import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'; // Import the Register.css file for styling

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                email,
                password,
            });

            if (response.status === 201) {
                console.log('User registered successfully');
                toast.success('Registration successful');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after a delay
                }, 2000); // Adjust the delay as needed
            } else {
                console.error('Registration failed');
                toast.error('Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            toast.error('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="email-input" // Add className for styling
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="password-input" // Add className for styling
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button> {/* Add className for styling */}
            </form>
        </div>
    );
}

export default Register;
