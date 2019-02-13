const mongodb = require('../../databases/mongodb/mongodbConnection');


const peopleSchema = mongodb.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: String,
        required: true,
        //lowercase: true
    },

    gender: {
        type: String,
        required: true
    }

},
{
    timestamps: true
}
);

module.exports = mongodb.model('cl_peoples', peopleSchema);