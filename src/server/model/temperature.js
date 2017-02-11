/**
 * This module contains the Temperature model setup
 */
const mongoose = require('mongoose');

/**
 * The temperature model schema
 */
const TemperatureSchema = new mongoose.Schema({
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

const TemperatureAggrSchema = new mongoose.Schema({
    current: {
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
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    sum: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

/**
 * This collection stores the temperature values.
 */
const Temperature = mongoose.model('Temperature', TemperatureSchema);
const TemperatureAggr = mongoose.model('TemperatureAggr', TemperatureAggrSchema);
module.exports = {
    Temperature,
    TemperatureAggr
};
