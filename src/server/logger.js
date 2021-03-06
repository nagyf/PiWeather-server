/**
 * This module sets up the application logging
 */

var winston = require('winston');

winston.add(winston.transports.File, {
    filename: 'piweather.log'
});

module.exports = winston;
