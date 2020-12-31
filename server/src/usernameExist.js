/**
 * Module loginAuthentication.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 31/12/2020
 * Authors: Ethan Cowey
 * Description: This is to replace the original check if the username is unique that was in index.js to allow better
 * unit testing. It takes as parameters the username as well as the request and response
 * parameters. It will then using the database connection uri connect to the database and send a response to the
 * front end if that username exists using res.send(doc)
 */
const mongoose = require('mongoose')
const UserAccount = require('./user') // Constructor for User Account collection in the database
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'

function isUsernameUnique (username, req, res) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => {
      UserAccount.findOne({ username: username })// find a match in the database
        .then(doc => res.send(doc))
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(`db error ${err.message}`)
      process.exit(-1)
    })
}

module.exports.isUsernameUnique = isUsernameUnique
