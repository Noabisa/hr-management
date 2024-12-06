import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [employeeData, setEmployeeData] = useState({
        staffNumber: '',
        fullName: '',
        identityNumber: '',
        qualifications: [],
        position: '',
        salary: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('fullName'); // Default sorting by fullName
    const [sortOrder, setSortOrder] = useState('asc'); // Default ascending order

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:5003/api/employees');
        setEmployees(response.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5003/api/employees/${id}`);
        fetchEmployees(); // Refresh employee list
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee._id);
        setEmployeeData({
            staffNumber: employee.staffNumber,
            fullName: employee.fullName,
            identityNumber: employee.identityNumber,
            qualifications: employee.qualifications,
            position: employee.position,
            salary: employee.salary
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5003/api/employees/${editingEmployee}`, employeeData);
            fetchEmployees(); // Refresh employee list
            setEditingEmployee(null); // Clear editing state
            setEmployeeData({
                staffNumber: '',
                fullName: '',
                identityNumber: '',
                qualifications: [],
                position: '',
                salary: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'qualifications') {
            setEmployeeData({ ...employeeData, [name]: value.split(',').map(q => q.trim()) });
        } else {
            setEmployeeData({ ...employeeData, [name]: value });
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    const filteredEmployees = employees
        .filter(employee => 
            employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
            }
        });

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            <div className="search-sort-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="sort-buttons">
                    <button onClick={() => handleSort('fullName')} className="sort-button">
                        Sort by Name
                        <span className="sort-arrow">{sortBy === 'fullName' ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : ''}</span>
                    </button>
                    <button onClick={() => handleSort('position')} className="sort-button">
                        Sort by Position
                        <span className="sort-arrow">{sortBy === 'position' ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : ''}</span>
                    </button>
                </div>
            </div>
            <ul>
                {filteredEmployees.map(employee => (
                    <li key={employee._id}>
                        <span>{employee.fullName} - {employee.position}</span>
                        <div className="button-container">
                            <button onClick={() => handleEdit(employee)}>Edit</button>
                            <button className="delete" onClick={() => handleDelete(employee._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {editingEmployee && (
                <form className="employee-form" onSubmit={handleUpdate}>
                    <h3>Edit Employee</h3>
                    <input
                        type="text"
                        name="staffNumber"
                        value={employeeData.staffNumber}
                        onChange={handleChange}
                        placeholder="Staff Number"
                    />
                    <input
                        type="text"
                        name="fullName"
                        value={employeeData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <input
                        type="text"
                        name="identityNumber"
                        value={employeeData.identityNumber}
                        onChange={handleChange}
                        placeholder="Identity Number"
                    />
                    <input
                        type="text"
                        name="qualifications"
                        value={employeeData.qualifications.join(', ')} // Assuming qualifications is an array
                        onChange={handleChange}
                        placeholder="Qualifications (comma separated)"
                    />
                    <input
                        type="text"
                        name="position"
                        value={employeeData.position}
                        onChange={handleChange}
                        placeholder="Position"
                    />
                    <input
                        type="text"
                        name="salary"
                        value={employeeData.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                    />
                    <button type="submit">Update</button>
                </form>
            )}
        </div>
    );
};

export default EmployeeList;