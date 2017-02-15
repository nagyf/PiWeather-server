/**
 * This module contains the Pressure model setup
 */
const mongoose = require('mongoose');

/**
 * The pressure model schema
 */
const PressureSchema = new mongoose.Schema({
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

const PressureAggrSchema = new mongoose.Schema({
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
 * This collection stores the Barometric pressure values
 */
const Pressure = mongoose.model('Pressure', PressureSchema);
const PressureAggr = mongoose.model('PressureAggr', PressureAggrSchema);
module.exports = {
    Pressure,
    PressureAggr
};
