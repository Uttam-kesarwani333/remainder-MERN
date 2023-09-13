import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
