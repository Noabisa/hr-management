const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Add new employee
router.post('/', async (req, res) => {
    const { staffNumber, fullName, identityNumber, qualifications, position, salary } = req.body;
    const newEmployee = new Employee({ staffNumber, fullName, identityNumber, qualifications, position, salary });
    try {
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update employee
router.put('/:id', async ( req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete employee
router.delete('/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;