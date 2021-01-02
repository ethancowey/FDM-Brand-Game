/**
 * Module loginAuthentication.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 31/12/2020
 * Authors: Ethan Cowey
 * Description: This is to replace the original authentication that was in index.js it takes as parameters the users
 * hashed password and username as well as the request and response parameters. Using the database
 * connection uri it will connect to the database and send a response to the front end if that combination is correct
 * using res.send(doc)
 */
const mongoose = require('mongoose')
const UserAccount = require('./user') // Constructor for User Account collection in the database
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'

async function validLogin (hash, username) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const loggedIn = await UserAccount.findOne({ username: username, password: hash }).then(result => {
    return result
  })
  return loggedIn
}

module.exports.validLogin = validLogin
