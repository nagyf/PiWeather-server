/**
 * Setup the connection to the database
 */

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var config = require('./config/config');
var logger = require('./logger');

var dbUrl = config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.dbname;
mongoose.connect('mongodb://' + dbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    logger.info('Connected to DB: ' + dbUrl);
});
