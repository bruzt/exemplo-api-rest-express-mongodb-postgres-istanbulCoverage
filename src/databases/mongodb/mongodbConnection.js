const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

mongoose.connect(
    //'mongodb://cliente1:123@localhost:27017/peoples', 
    `${config.mongoDialect}://${config.mongoUsername}:${config.mongoPassword}@${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}`,
    { 
        useNewUrlParser: true, 
        ssl: false
    }
);

mongoose.set('useFindAndModify', false);

module.exports = mongoose;