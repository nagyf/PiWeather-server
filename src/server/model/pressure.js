/**
 * This module contains the Pressure model setup
 */
var mongoose = require('mongoose');

/**
 * The pressure model schema
 */
var PressureSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

/**
 * This collection stores the Barometric pressure values
 */
var Pressure = mongoose.model('Pressure', PressureSchema);
module.exports = Pressure;