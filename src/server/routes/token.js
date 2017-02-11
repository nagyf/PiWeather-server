const express = require('express');
const logger = require('../logger');
const router = express.Router();
const cfg = require('../config/config');
const jwt = require("jwt-simple");
const moment = require('moment');

/**
 * Login route: check the user credentials, and if everything is ok create a JWT token for the user and return it.
 */
router.post('/renew', function (req, res, next) {
    const oldToken = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.decode(oldToken, cfg.jwt.secret);

    const expiration = moment().add(1, 'hours').unix();
    const payload = {id: decoded.id, exp: expiration};
    const token = jwt.encode(payload, cfg.jwt.secret);
    res.json({token: token, id: decoded.id, expiration: expiration});
});

module.exports = router;
