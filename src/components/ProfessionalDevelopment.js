// components/ProfessionalDevelopment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file for this component

const ProfessionalDevelopment = () => {
    const [identityNumber, setIdentityNumber] = useState('');
    const [qualifications, setQualifications] = useState([]);
    const [qualification, setQualification] = useState('');
    const [type, setType] = useState('academic');
    const [loading, setLoading] = useState(false); // Use loading state
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchQualifications = async () => {
            if (identityNumber) {
                setLoading(true); // Set loading to true before fetching
                try {
                    const response = await axios.get(`/api/development/${identityNumber}`);
                    setQualifications(response.data);
                } catch (err) {
                    setError('Error fetching qualifications');
                } finally {
                    setLoading(false); // Set loading to false after fetching
                }
            }
        };

        fetchQualifications();
    }, [identityNumber]);

    const handleAddQualification = async (e) => {
        e.preventDefault();
        const newQualification = { identityNumber, qualification, type };
        try {
            await axios.post(`/api/development`, newQualification);
            setQualification('');
            setType('academic');
            const response = await axios.get(`/api/development/${identityNumber}`);
            setQualifications(response.data);
            setSuccessMessage('Qualification added successfully! Points updated.');
        } catch (err) {
            setError('Error adding qualification');
        }
    };

    return (
        <div className="professional-development">
            <h2>Professional Development</h2>
            <form onSubmit={handleAddQualification}>
                <input
                    type="text"
                    value={identityNumber}
                    onChange={(e) => setIdentityNumber(e.target.value)}
                    placeholder="Employee Identity Number"
                    required
                />
                <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="Qualification"
                    required
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="academic">Academic</option>
                    <option value="professional">Professional</option>
                </select>
                <button type="submit">Add Qualification</button>
            </form>
            {loading && <p>Loading qualifications...</p>} {/* Show loading message */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
            <div className="qualifications-list">
                <ul>
                    {qualifications.map((qual) => (
                        <li key={qual._id}>
                            {qual.qualification} - {qual.type}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfessionalDevelopment;