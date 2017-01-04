var express = require('express');
//var logger = require('../logger');
var User = require('../model/user');
var router = express.Router();
var cfg = require('../config/config');
var jwt = require("jwt-simple");
var moment = require('moment');

/**
 * Login route: check the user credentials, and if everything is ok create a JWT token for the user and return it.
 */
router.post('/login', function (req, res, next) {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({email: email}).exec().then(
            function (user) {
                if (user && user.active && user.validPassword(password)) {
                    var expiration = moment().add(1, 'hours').unix();
                    var payload = {id: user._id, exp: expiration};
                    var token = jwt.encode(payload, cfg.jwt.secret);
                    res.json({token: token, id: user._id});
                } else {
                    res.sendStatus(401);
                }
            },
            function (err) {
                logger.error(err);
                res.status(500).send({error: 'An error occured on the server'});
            });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
