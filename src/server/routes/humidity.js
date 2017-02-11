const express = require('express');
const {Humidity, HumidityAggr} = require('../model/humidity');
const logger = require('../logger');
const router = express.Router();
const _ = require('lodash');

router.get('/', function (req, res, next) {
    const query = Humidity.find({});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.get('/aggregated', function (req, res, next) {
    const query = HumidityAggr.findOne({});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.post('/', function (req, res, next) {
    const humidity = new Humidity(req.body);
    humidity.date = new Date();
    const error = humidity.validateSync();
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
                let humidityAggrQuery = HumidityAggr.findOne({});
                humidityAggrQuery.exec().then(function (humidityAggr) {
                    if(!humidityAggr) {
                        humidityAggr = new HumidityAggr();
                        humidityAggr.sum = 0;
                        humidityAggr.count = 0;
                        humidityAggr.min = humidity.value;
                        humidityAggr.max = humidity.value;
                    }

                    humidityAggr.count += 1;
                    humidityAggr.sum += humidity.value;
                    humidityAggr.current = humidity.value;
                    humidityAggr.date = humidity.date;
                    humidityAggr.unit = humidity.unit;

                    if(!humidityAggr.min || humidityAggr.min > humidity.value) {
                        humidityAggr.min = humidity.value;
                    }

                    if(!humidityAggr.max || humidityAggr.max < humidity.value) {
                        humidityAggr.max = humidity.value;
                    }

                    humidityAggr.save(function (err) {
                        if(err) {
                            res.status(500).json(err);
                        } else {
                            res.json(humidity);
                        }
                    });
                });
            }
        });
    }
});

module.exports = router;
