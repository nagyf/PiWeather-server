/**
 * This module contains the Humidity model setup
 */
const mongoose = require('mongoose');

/**
 * The schema of the humidity model
 */
const HumiditySchema = new mongoose.Schema({
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

const HumidityAggrSchema = new mongoose.Schema({
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
 * This collection stores the relative humidity values.
 */
const Humidity = mongoose.model('Humidity', HumiditySchema);
const HumidityAggr = mongoose.model('HumidityAggr', HumidityAggrSchema);
module.exports = {
    Humidity,
    HumidityAggr
};
