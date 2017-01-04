/**
 * This module contains the Temperature model setup
 */
var mongoose = require('mongoose');

/**
 * The temperature model schema
 */
var TemperatureSchema = new mongoose.Schema({
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
 * This collection stores the temperature values.
 */
var Temperature = mongoose.model('Temperature', TemperatureSchema);
module.exports = Temperature;