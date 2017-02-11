const express = require('express');
const {Pressure, PressureAggr} = require('../model/pressure');
const logger = require('../logger');
const router = express.Router();
const _ = require('lodash');
const socket = require('../socket');

router.get('/', function (req, res, next) {
    const query = Pressure.find({});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.get('/aggregated', function (req, res, next) {
    const query = PressureAggr.findOne({});
    query.exec().then(
        function (data) {
            res.json(data);
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

router.post('/', function (req, res, next) {
    const pressure = new Pressure(req.body);
    pressure.date = new Date();
    const error = pressure.validateSync();
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
                let pressureAggrQuery = PressureAggr.findOne({});
                pressureAggrQuery.exec().then(function (pressureAggr) {
                    if(!pressureAggr) {
                        pressureAggr = new PressureAggr();
                        pressureAggr.sum = 0;
                        pressureAggr.count = 0;
                        pressureAggr.min = pressure.value;
                        pressureAggr.max = pressure.value;
                    }

                    pressureAggr.count += 1;
                    pressureAggr.sum += pressure.value;
                    pressureAggr.current = pressure.value;
                    pressureAggr.date = pressure.date;
                    pressureAggr.unit = pressure.unit;

                    if(!pressureAggr.min || pressureAggr.min > pressure.value) {
                        pressureAggr.min = pressure.value;
                    }

                    if(!pressureAggr.max || pressureAggr.max < pressure.value) {
                        pressureAggr.max = pressure.value;
                    }

                    pressureAggr.save(function (err) {
                        if(err) {
                            res.status(500).json(err);
                        } else {
                            socket.io().sockets.emit('pressure', pressure);
                            socket.io().sockets.emit('pressureAggr', pressureAggr);
                            res.json(pressure);
                        }
                    });
                });
            }
        });
    }
});

module.exports = router;
