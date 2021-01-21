/**
 * Module: resetPassword.js
 * Creation Date: 21/1/2021
 * Last Edit Date: 21/1/2021
 * Authors: Miles Prosser
 * Overview:
 * Updates user password with given hash value
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const UserAccount = require('./constructors/user') // Constructor for User Account collection in the database

async function updatePass (hash, username) {
    mongoose.connect(uriMongo, {
        useNewUrlParser: true, // These are used to fix depreciation conflicts with the MONGO DB node.js driver and mongoose
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then()
    await UserAccount.updateOne({ username: username }, { password: hash });
}

module.exports.updatePass = updatePass
