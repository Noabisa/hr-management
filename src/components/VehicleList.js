// VehicleList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Ensure you import the CSS file

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState({ id: '', model: '', status: '' });
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5003/api/vehicles');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5003/api/vehicles/${id}`);
            fetchVehicles(); // Refresh vehicle list
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const handleEdit = (vehicle) => {
        setCurrentVehicle(vehicle);
        setIsEditing(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5003/api/vehicles/${currentVehicle.id}`, {
                model: currentVehicle.model,
                status: currentVehicle.status,
            });
            setIsEditing(false);
            fetchVehicles(); // Refresh vehicle list
            setCurrentVehicle({ id: '', model: '', status: '' }); // Clear the form
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };

    // Filter vehicles based on the search term
    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="vehicle-list">
            <h2>Vehicle List</h2>
            <input
                type="text"
                placeholder="Search by model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <ul>
                {filteredVehicles.map((vehicle) => (
                    <li key={vehicle._id}>
                        {vehicle.model} - {vehicle.status}
                        <button className="edit" onClick={() => handleEdit(vehicle)}>Edit</button>
                        <button className="delete" onClick={() => handleDelete(vehicle._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {isEditing && (
                <div className="edit-form">
                    <h3>Edit Vehicle</h3>
                    <form onSubmit={handleUpdate}>
                        <label>Model:</label>
                        <input
                            type="text"
                            value={currentVehicle.model}
                            onChange={(e) => setCurrentVehicle({ ...currentVehicle, model: e.target.value })}
                            required
                        />
                        <label>Status:</label>
                        <input
                            type="text"
                            value={currentVehicle.status}
                            onChange={(e) => setCurrentVehicle({ ...currentVehicle, status: e.target.value })}
                            required
                        />
                        <button type="submit">Update Vehicle</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default VehicleList;