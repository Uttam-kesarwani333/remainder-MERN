import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import DashboardButtons from './DashboardButtons';
import CreateReminders from './CreateReminders';
import ModifyReminders from './ModifyReminders';
import DeleteReminders from './DeleteReminders';
import ViewReminders from './ViewReminders';
import './App.css'; // Import your component-based CSS here
import LandingPage from './LandingPage';

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<DashboardButtons />} />
                    <Route path="/reminders/create" element={<CreateReminders />} />
                    <Route path="/reminders/view" element={<ViewReminders />} />
                    <Route path="/modify-reminder" element={<ModifyReminders />} />
                    <Route path="/delete-reminder" element={<DeleteReminders />} />

                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
