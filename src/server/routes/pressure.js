var express = require('express');
var Pressure = require('../model/pressure');
var logger = require('../logger');
var router = express.Router();
var _ = require('lodash');

router.get('/', function (req, res, next) {
    var query = Pressure.find({});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.post('/', function (req, res, next) {
    var pressure = new Pressure(req.body);
    pressure.date = new Date();
    var error = pressure.validateSync();
    if (error) {
        res.status(400).json({
            name: error.name,
            message: error.message
        });
    } else {
        pressure.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(pressure);
            }
        });
    }
});

module.exports = router;
