import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ModifyReminders() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [smsNo, setSmsNo] = useState('');
    const [recur, setRecur] = useState([]);
    const [isEnabled, setIsEnabled] = useState(true); // Added isEnabled state

    useEffect(() => {
        axios.get(`http://localhost:5000/reminders/edit/${id}`)
            .then((response) => {
                const reminderData = response.data;
                setDate(new Date(reminderData.date).toISOString().split('T')[0]);
                setTime(new Date(reminderData.date).toISOString().split('T')[1].substring(0, 5));
                setSubject(reminderData.subject);
                setDescription(reminderData.description);
                setEmail(reminderData.email);
                setContactNo(reminderData.contactNo);
                setSmsNo(reminderData.smsNo);
                setRecur(reminderData.recur);
                setIsEnabled(reminderData.isEnabled); // Set isEnabled based on the reminder data
            })
            .catch((error) => {
                console.error('Fetching reminder failed:', error.message);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedReminderData = {
                date: `${date}T${time}:00`,
                subject,
                description,
                email,
                contactNo,
                smsNo,
                recur,
                isEnabled, // Include the isEnabled status in the request
            };

            const response = await axios.put(`http://localhost:5000/reminders/edit/${id}`, updatedReminderData);

            if (response.status === 200) {
                console.log('Reminder updated successfully');
                navigate('/reminders/view');
            } else {
                console.error('Reminder update failed');
            }
        } catch (error) {
            console.error('Reminder update failed:', error.message);
        }
    };

    // Function to toggle the isEnabled state
    const toggleEnabled = () => {
        setIsEnabled(!isEnabled);
    };

    return (
        <div>
            <h2>Edit Reminder</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
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
                    <label>Contact Number:</label>
                    <input
                        type="tel"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>SMS Number:</label>
                    <input
                        type="tel"
                        value={smsNo}
                        onChange={(e) => setSmsNo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Recurrence:</label>
                    <select
                        multiple
                        value={recur}
                        onChange={(e) => setRecur(Array.from(e.target.selectedOptions, option => option.value))}
                    >
                        <option value="7 Days">7 Days</option>
                        <option value="5 Days">5 Days</option>
                        <option value="3 Days">3 Days</option>
                        <option value="2 Days">2 Days</option>
                    </select>
                </div>
                {/* Toggle switch for enable/disable */}
                <div className="form-group">
                    <label>Enable/Disable:</label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={toggleEnabled}
                        />
                        Enabled
                    </label>
                </div>
                <button type="submit">Update Reminder</button>
            </form>
        </div>
    );
}

export default ModifyReminders;
