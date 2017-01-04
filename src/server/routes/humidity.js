var express = require('express');
var Humidity = require('../model/humidity');
var logger = require('../logger');
var router = express.Router();
var _ = require('lodash');

router.get('/', function (req, res, next) {
    var query = Humidity.find({});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.post('/', function (req, res, next) {
    var humidity = new Humidity(req.body);
    humidity.date = new Date();
    var error = humidity.validateSync();
    if (error) {
        res.status(400).json({
            name: error.name,
            message: error.message
        });
    } else {
        humidity.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(humidity);
            }
        });
    }
});

module.exports = router;
