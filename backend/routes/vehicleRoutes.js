const express = require('express');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

// Add new vehicle
router.post('/', async (req, res) => {
    const { vin, model, mileage, driver, status } = req.body;
    const newVehicle = new Vehicle({ vin, model, mileage, driver, status });
    try {
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update vehicle
router.put('/:id', async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;