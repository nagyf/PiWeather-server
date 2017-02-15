var winston = require('winston');
var io = null;

function init(s) {
    io = require('socket.io').listen(s);
}

function getIO(){
    return io;
}

module.exports = {
    init: init,
    io: getIO
};
