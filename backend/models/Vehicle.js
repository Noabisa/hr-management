const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vin: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    mileage: { type: Number, required: true },
    driver: { type: String, required: true },
    status: { type: String, enum: ['available', 'in use', 'on service', 'sold'], default: 'available' }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);