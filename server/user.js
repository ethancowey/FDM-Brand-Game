const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('UserAccount', userSchema)