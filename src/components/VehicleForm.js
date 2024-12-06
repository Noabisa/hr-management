import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const VehicleForm = ({ fetchVehicles }) => {
    const [vehicle, setVehicle] = useState({
        vin: '',
        model: '',
        mileage: '',
        driver: '',
        status: 'available'
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5003/api/vehicles', vehicle);
            setSuccessMessage('Vehicle added successfully!');
            fetchVehicles(); // Refresh vehicle list
            setVehicle({
                vin: '',
                model: '',
                mileage: '',
                driver: '',
                status: 'available'
            });
        } catch (error) {
            console.error(error);
            setSuccessMessage('Error adding vehicle.');
        }
    };

    return (
        <div className="vehicle-form"> 
            <h2>Add Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <input name="vin" value={vehicle.vin} onChange={handleChange} placeholder="VIN" required />
                <input name="model" value={vehicle.model} onChange={handleChange} placeholder="Model" required />
                <input name="mileage" type="number" value={vehicle.mileage} onChange={handleChange} placeholder="Mileage" required />
                <input name="driver" value={vehicle.driver} onChange={handleChange} placeholder="Driver" required />
                <select name="status" value={vehicle.status} onChange={handleChange}>
                    <option value="available">Available</option>
                    <option value="in use">In Use</option>
                    <option value="on service">On Service</option>
                    <option value="sold">Sold</option>
                </select>
                <button type="submit">Add Vehicle</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default VehicleForm;