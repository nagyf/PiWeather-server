var express = require('express');
var Temperature = require('../model/temperature');
var logger = require('../logger');
var router = express.Router();
var _ = require('lodash');

router.get('/', function (req, res, next) {
    var query = Temperature.find({});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.post('/', function (req, res, next) {
    var temp = new Temperature(req.body);
    temp.date = new Date();
    var error = temp.validateSync();
    if (error) {
        res.status(400).json({
            name: error.name,
            message: error.message
        });
    } else {
        temp.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(temp);
            }
        });
    }
});

module.exports = router;
