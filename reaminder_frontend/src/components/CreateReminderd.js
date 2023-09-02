import React, { useState } from 'react';
import axios from 'axios';

function CreateReminder() {
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
    const [recur, setRecur] = useState([]);
    // Add more state variables for other fields if needed

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setRecur([...recur, value]);
        } else {
            setRecur(recur.filter((item) => item !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to create a new reminder
            const response = await axios.post('http://localhost:5000/reminders', {
                date,
                subject,
                description,
                email,
                contactNo,
                smsNo,
                recur,
                // Add more fields as needed
            });

            // Check if reminder creation was successful
            if (response.status === 201) {
                console.log('Reminder created successfully');
                // Redirect or perform other actions as needed
            } else {
                console.error('Failed to create a reminder');
                // Handle the case where reminder creation failed
            }
        } catch (error) {
            console.error('Reminder creation failed:', error.message);
            // Handle any errors that occurred during reminder creation
        }
    };

    return (
        <div className="create-reminder-container">
            <h2>Create a New Reminder</h2>
            <form onSubmit={handleSubmit}>
                {/* Add form fields for date, subject, description, email, contactNo, smsNo, and recur */}
                {/* Example date field */}
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                {/* Add more form fields for other inputs */}

                <div className="form-group">
                    <label>Recur for next:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="7 Days"
                                checked={recur.includes("7 Days")}
                                onChange={handleCheckboxChange}
                            />
                            7 Days
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="5 Days"
                                checked={recur.includes("5 Days")}
                                onChange={handleCheckboxChange}
                            />
                            5 Days
                        </label>
                        {/* Add checkboxes for other options */}
                    </div>
                </div>

                <button type="submit">Create Reminder</button>
            </form>
        </div>
    );
}

export default CreateReminder;
