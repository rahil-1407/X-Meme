const mongoose = require('mongoose');
const toJson = require('meanie-mongoose-to-json');

//Making a new Schema
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
});

userschema.plugin(toJson);

//DB names is xmemedb
module.exports = new mongoose.model('xmemedb', userschema);