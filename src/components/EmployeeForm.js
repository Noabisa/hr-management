import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const EmployeeForm = ({ fetchEmployees }) => {
    const [employee, setEmployee] = useState({
        staffNumber: '',
        fullName: '',
        identityNumber: '',
        qualifications: [],
        position: '',
        salary: ''
    });
    const [qualification, setQualification] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
        setErrorMessage(''); // Clear error message on input change
    };

    const validateForm = () => {
        if (employee.salary <= 0) {
            setErrorMessage('Salary must be a positive number.');
            return false;
        }
        return true;
    };

    const handleAddQualification = () => {
        if (qualification) {
            setEmployee(prevState => ({
                ...prevState,
                qualifications: [...prevState.qualifications, qualification]
            }));
            setQualification(''); // Clear the input after adding
            setErrorMessage(''); // Clear any error message
        }
    };

    const handleRemoveQualification = (index) => {
        setEmployee(prevState => ({
            ...prevState,
            qualifications: prevState.qualifications.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Validate form before submission

        setLoading(true); // Set loading state
        try {
            await axios.post('http://localhost:5003/api/employees', employee);
            setSuccessMessage('Employee added successfully!');
            fetchEmployees(); // Refresh employee list
            setEmployee({
                staffNumber: '',
                fullName: '',
                identityNumber: '',
                qualifications: [],
                position: '',
                salary: ''
            });
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Error adding employee.';
            setErrorMessage(message); // Set error message from server response
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="employee-form"> 
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="staffNumber" 
                    value={employee.staffNumber} 
                    onChange={handleChange} 
                    placeholder="Staff Number" 
                    required 
                />
                <input 
                    name="fullName" 
                    value={employee.fullName} 
                    onChange={handleChange} 
                    placeholder="Full Name" 
                    required 
                />
                <input 
                    name="identityNumber" 
                    value={employee.identityNumber} 
                    onChange={handleChange} 
                    placeholder="Identity Number" 
                    required 
                />
                <input 
                    name="position" 
                    value={employee.position} 
                    onChange={handleChange} 
                    placeholder="Position" 
                    required 
                />
                <input 
                    name="salary" 
                    type="number" 
                    value={employee.salary} 
                    onChange={handleChange} 
                    placeholder="Salary" 
                    required 
                />
                
                <div>
                    <input 
                        value={qualification} 
                        onChange={(e) => setQualification(e.target.value)} 
                        placeholder="Add Qualification" 
                    />
                    <button type="button" onClick={handleAddQualification}>Add</button>
                </div>
                
                <ul>
                    {employee.qualifications.map((qual, index) => (
                        <li key={index}>
                            {qual}
                            <button type="button" onClick={() => handleRemoveQualification(index)}>Remove</button>
                        </li>
                    ))}
                </ul>

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Employee'}
                </button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default EmployeeForm;