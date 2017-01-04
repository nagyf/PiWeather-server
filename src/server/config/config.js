var config = {};

config.mongo = {
    host: 'localhost',
    port: 27017,
    dbname: 'piweather'
};

config.jwt = {
    secret: 'MyS3cr3tK3Y',
    session: false
};

module.exports = config;
