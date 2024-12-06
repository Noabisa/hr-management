// routes/development.js
const express = require('express');
const router = express.Router();
const ProfessionalDevelopment = require('../models/professionalDevelopment');
const Employee = require('../models/Employee');

// Add new qualification
router.post('/', async (req, res) => {
    const { identityNumber, qualification, type } = req.body;

    try {
        // Create a new professional development record
        const newQualification = new ProfessionalDevelopment({ identityNumber, qualification, type });
        await newQualification.save();

        // Update employee points
        const pointsToAdd = type === 'academic' ? 5 : 7;
        await Employee.findOneAndUpdate({ identityNumber }, { $inc: { points: pointsToAdd } });

        res.status(201).json(newQualification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get qualifications for an employee using identityNumber
router.get('/:identityNumber', async (req, res) => {
    try {
        const qualifications = await ProfessionalDevelopment.find({ identityNumber: req.params.identityNumber });
        res.json(qualifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update qualification (if needed)
router.put('/:id', async (req, res) => {
    try {
        const updatedQualification = await ProfessionalDevelopment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedQualification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete qualification
router.delete('/:id', async (req, res) => {
    try {
        await ProfessionalDevelopment.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;