const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        min: [5, "JKKJKJKJKaksdkjas"],
        max: 32
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', schema);