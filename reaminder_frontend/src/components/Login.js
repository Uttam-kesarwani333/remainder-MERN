import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardButtons from './DashboardButtons'; // Import your DashboardButtons component

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // State variable to track login status
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                console.log('Logged in successfully');
                toast.success('Login successful'); // Show success toast
                setLoggedIn(true);
                setTimeout(() => {
                    navigate('/dashboard'); // Redirect to the dashboard after a successful login
                }, 2000); // Adjust the delay as needed
            }
            else {
                console.error('Login failed');
                toast.error('Login failed'); // Show error toast
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            toast.error('Login failed'); // Show error toast
        }
    };
    if (loggedIn) {
        return <DashboardButtons />;
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <ToastContainer />
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
        </div>
    );
}

export default Login;
