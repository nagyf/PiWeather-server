/**
 * This module contains the Humidity model setup
 */
var mongoose = require('mongoose');

/**
 * The schema of the humidity model
 */
var HumiditySchema = new mongoose.Schema({
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
 * This collection stores the relative humidity values.
 */
var Humidity = mongoose.model('Humidity', HumiditySchema);
module.exports = Humidity;