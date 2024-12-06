// models/ProfessionalDevelopment.js
const mongoose = require('mongoose');

const professionalDevelopmentSchema = new mongoose.Schema({
    identityNumber: { type: String, required: true }, // Foreign key referencing Employee's identityNumber
    qualification: { type: String, required: true },
    type: { type: String, enum: ['academic', 'professional'], required: true },
    dateAcquired: { type: Date, default: Date.now }
});

// Validate that the identityNumber exists in Employee collection
professionalDevelopmentSchema.pre('save', async function(next) {
    const employeeExists = await mongoose.models.Employee.exists({ identityNumber: this.identityNumber });
    if (!employeeExists) {
        throw new Error('Employee with this identity number does not exist.');
    }
    next();
});

module.exports = mongoose.model('ProfessionalDevelopment', professionalDevelopmentSchema);