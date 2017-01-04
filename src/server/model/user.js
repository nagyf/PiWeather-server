var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        max: 50
    },
    nick: {
        type: String,
        required: true,
        max: 15
    },
    active: {
        type: Boolean,
        required: true
    }
});

/**
 * Checks if the password of the user matches the given plain text password
 * @param password the given password in plain text
 * @return {boolean}
 */
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);

// Create a test user in development environment, if there are no users in the DB
if (process.env.NODE_ENV === 'dev') {
    User.findOne({'email': 'nagyf@nagyf.hu'}, function (err, user) {
        if (err) {
            console.log(err);
        } else if (!user) {
            var bcrypt = require('bcryptjs');
            var salt = bcrypt.genSaltSync(10);
            // The password will be "a"
            var hash = bcrypt.hashSync("a", salt);

            var newUser = new User({
                email: 'nagyf@nagyf.hu',
                password: hash,
                name: 'Nagy Ferenc',
                nick: 'Feri',
                active: true
            });

            newUser.save(function (err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('New user successfully inserted into the db.');
                }
            });
        }
    });
}


module.exports = User;
