var passport = require('passport');
var passportJWT = require('passport-jwt');
var User = require('./model/user.js');
var config = require('./config/config.js');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

// Export a function that initializes the Passport-JWT strategy
module.exports = function () {
    var strategy = new Strategy(params, function (payload, done) {
        User.findOne({_id: payload.id}).exec(
            function(err, user){
                if (user) {
                    return done(null, {id: user._id});
                } else {
                    return done(new Error('User not found'), null);
                }
            }
        );
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', {session: config.jwt.session});
        }
    };
};
