var express = require('express');
var User = require('../model/user');
var logger = require('../logger');
var router = express.Router();
var q = require('q');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

function pickUserFields(data) {
    var allowedFields = ['_id', 'name', 'email', 'active', 'nick'];
    if (_.isArray(data)) {
        return _.map(data, function (u) {
            return _.pick(u, allowedFields);
        });
    } else if (_.isObject(data)) {
        return _.pick(data, allowedFields);
    }
}

/**
 * List all users
 */
router.get('/', function (req, res, next) {
    var query = User.find({});
    query.exec().then(
        function (data) {
            res.json(pickUserFields(data));
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

/**
 * Get a user by id
 */
router.get('/:id', function (req, res, next) {
    var query = User.findOne({_id: req.params.id});
    query.exec().then(
        function (data) {
            res.json(pickUserFields(data));
        }, function (err) {
            logger.error(err);
            res.status(500).send({error: 'An error occured on the server'});
        });
});

/**
 * Create a new user
 */
router.post('/', function (req, res, next) {
    var user = new User(req.body);

    // FIXME generate a random password and send an activation link
    var salt = bcrypt.genSaltSync(10);
    // The password will be "a"
    user.password = bcrypt.hashSync("a", salt);

    var error = user.validateSync();
    if (error) {
        res.status(400).json({
            name: error.name,
            message: error.message
        });
    } else {
        user.save(function (err) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(pickUserFields(user));
            }
        });
    }
});

router.post('/changepassword', function (req, res) {
    var model = req.body;
    var salt = bcrypt.genSaltSync(10);
    var newPassword = bcrypt.hashSync(model.password, salt);

    User.findOneAndUpdate({_id: model.id}, {password: newPassword}, function (err, user) {
        if (err) {
            res.status(400).json({
                message: 'User not found'
            });
        } else {
            res.json(pickUserFields(user));
        }
    });
});

/**
 * Update a user
 */
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    User.findOne({_id: id}).exec(
        function (err, user) {
            if (err) {
                res.status(400).json({
                    message: 'User not found'
                });
            } else {
                user.update(req.body, function (err, result) {
                    if (err) {
                        res.status(500).json({
                            message: 'Error updating the user'
                        });
                    } else {
                        res.json(result);
                    }
                });
            }
        }
    );
});

/**
 * Delete a user by id
 */
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    User.findOne({_id: id}).exec(
        function (err, user) {
            if (err) {
                res.status(400).json({
                    message: 'User not found'
                });
            } else {
                user.remove();
                res.json({
                    message: 'Ok'
                });
            }
        }
    );
});

module.exports = router;
