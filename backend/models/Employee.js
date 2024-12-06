// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    staffNumber: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    identityNumber: { type: String, required: true, unique: true }, // Primary key
    qualifications: [String],
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    points: { type: Number, default: 0 }, // For professional development points
    isActive: { type: Boolean, default: true } // To track active/terminated status
});

module.exports = mongoose.model('Employee', employeeSchema);