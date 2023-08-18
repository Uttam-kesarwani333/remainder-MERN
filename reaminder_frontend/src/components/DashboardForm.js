import React, { useState } from 'react';
import './DashboardForm.css'; // Import the CSS file for styling

function DashboardForm() {
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
    const [recurOptions, setRecurOptions] = useState([]);

    const handleRecurChange = (option) => {
        if (recurOptions.includes(option)) {
            setRecurOptions(recurOptions.filter(item => item !== option));
        } else {
            setRecurOptions([...recurOptions, option]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process and submit the form data here
    };

    return (
        <div className="dashboard-form-container">
            <h2>Set a new Reminder</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Select a Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                    Subject:
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Select a subject</option>
                        {/* Add subject options here */}
                    </select>
                </label>
                <label>
                    Add description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Email Address:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Contact No:
                    <input type="tel" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                </label>
                <label>
                    SMS No:
                    <input type="tel" value={smsNo} onChange={(e) => setSmsNo(e.target.value)} />
                </label>
                <label>
                    Recur for next:
                    <div>
                        <label>
                            <input type="checkbox" checked={recurOptions.includes('7 Days')} onChange={() => handleRecurChange('7 Days')} />
                            7 Days
                        </label>
                        <label>
                            <input type="checkbox" checked={recurOptions.includes('5 Days')} onChange={() => handleRecurChange('5 Days')} />
                            5 Days
                        </label>
                        <label>
                            <input type="checkbox" checked={recurOptions.includes('3 Days')} onChange={() => handleRecurChange('3 Days')} />
                            3 Days
                        </label>
                        <label>
                            <input type="checkbox" checked={recurOptions.includes('2 Days')} onChange={() => handleRecurChange('2 Days')} />
                            2 Days
                        </label>
                    </div>
                </label>
                <button className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default DashboardForm;
