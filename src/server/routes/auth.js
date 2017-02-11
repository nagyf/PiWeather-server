const express = require('express');
//const logger = require('../logger');
const User = require('../model/user');
const router = express.Router();
const cfg = require('../config/config');
const jwt = require("jwt-simple");
const moment = require('moment');

/**
 * Login route: check the user credentials, and if everything is ok create a JWT token for the user and return it.
 */
router.post('/login', function (req, res, next) {
    if (req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email: email}).exec().then(
            function (user) {
                if (user && user.active && user.validPassword(password)) {
                    const expiration = moment().add(1, 'hours').unix();
                    const payload = {id: user._id, exp: expiration};
                    const token = jwt.encode(payload, cfg.jwt.secret);
                    res.json({token: token, id: user._id, expiration: expiration});
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
