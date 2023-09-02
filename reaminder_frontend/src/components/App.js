import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
// import DashboardButtons from './DashboardButtons';
import './App.css'; // Import your component-based CSS here
import LandingPage from './LandingPage';

function App() {
    return (<>
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
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}

                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>

        {/* <DashboardButtons /> */}
    </>
    );
}
export default App;
