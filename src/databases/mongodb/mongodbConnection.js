const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://cliente1:123@localhost:27017/peoples', { useNewUrlParser: true, ssl: false }
);

mongoose.set('useFindAndModify', false);

module.exports = mongoose;