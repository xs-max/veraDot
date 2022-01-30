const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleType: {
        type: String,
        required: [true, "A vehicle should have a vehicle type"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A vehicle must have an owner']
    },
    plateNumber: {
        type: String,
        unique: true,
        required: [true, 'A vehicle should have a plate number'],
        unique: true
    },
    proofOfOwnership: {
        type: String,
        required: [true, 'a vehicle must have proof of ownership']
    },
    paymentStatus: {
        type: String,
        required: true,
        default: 'not-paid',
        enum: ['paid', 'not-paid']
    }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;