var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');

var app = express();
var winston = require('./logger');
var db = require('./db');
require('./model/user');
var auth = require('./auth')();

app.use(favicon(__dirname + '/../../public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/../../public')));
app.use(express.static(path.join(__dirname, '/../../dist')));

if (app.get('env') === 'dev') {
    var webpack = require('webpack');
    var config = require('../../webpack.config');
    var compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/token', auth.authenticate(), require('./routes/token'));
app.use('/api/users', auth.authenticate(), require('./routes/users'));
app.use('/api/temperature', auth.authenticate(), require('./routes/temperature'));
app.use('/api/pressure', auth.authenticate(), require('./routes/pressure'));
app.use('/api/humidity', auth.authenticate(), require('./routes/humidity'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../public/index.html'));
});

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
    app.use(function (err, req, res, next) {
        winston.error(err.stack);
        res.status(500).send('Something bad happened on the server!');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    winston.error(err.stack);
    res.status(500).send('Something bad happened on the server!');
});

var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function (err) {
    if (err) {
        return winston.error(err);
    }

    winston.log('Listening at http://localhost:' + port + '/');
});
