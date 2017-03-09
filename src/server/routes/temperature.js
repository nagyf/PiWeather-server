const express = require('express');
const {Temperature, TemperatureAggr} = require('../model/temperature');
const logger = require('../logger');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const socket = require('../socket');

router.get('/', function (req, res, next) {
    const from = moment().subtract(1, 'days');
    const query = Temperature.find({date: {$gt: from.toDate()}});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.get('/aggregated', function (req, res, next) {
    const query = TemperatureAggr.findOne({});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.post('/', function (req, res, next) {
    const temp = new Temperature(req.body);
    temp.date = new Date();
    const error = temp.validateSync();
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
                let tempAggrQuery = TemperatureAggr.findOne({});
                tempAggrQuery.exec().then(function (tempAggr) {
                    if(!tempAggr) {
                        tempAggr = new TemperatureAggr();
                        tempAggr.sum = 0;
                        tempAggr.count = 0;
                        tempAggr.min = temp.value;
                        tempAggr.max = temp.value;
                    }

                    tempAggr.count += 1;
                    tempAggr.sum += temp.value;
                    tempAggr.current = temp.value;
                    tempAggr.date = temp.date;
                    tempAggr.unit = temp.unit;

                    if(!tempAggr.min || tempAggr.min > temp.value) {
                        tempAggr.min = temp.value;
                    }

                    if(!tempAggr.max || tempAggr.max < temp.value) {
                        tempAggr.max = temp.value;
                    }

                    tempAggr.save(function (err) {
                        if(err) {
                            res.status(500).json(err);
                        } else {
                            socket.io().sockets.emit('temperature', temp);
                            socket.io().sockets.emit('temperatureAggr', tempAggr);
                            res.json(temp);
                        }
                    });
                });
            }
        });
    }
});

module.exports = router;
