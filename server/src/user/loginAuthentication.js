/**
 * Module loginAuthentication.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 01/01/2021
 * Authors: Ethan Cowey
 * Overview: This is to replace the original authentication method that was in index.js it takes as parameters
 * the users hashed password and username. Using the database connection uri it will connect to the database and then
 * query the database for that entry. If it finds a match it will return that document but it will exclude the hashed
 * passwords from the results so they arent sent to front-end. Otherwise it returns null as theres no match.
 * This method is invoked when the front-end sends a post request to authenticate a login to index.js which calls this
 * method it will also return the result of this method (without the password) to the front-end using res.send()
 */
const mongoose = require('mongoose')
const UserAccount = require('../constructors/user') // Constructor for User Account collection in the database
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'

async function validLogin (hash, username) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true, // These are used to fix depreciation conflicts with the MONGO DB node.js driver and mongoose
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const loggedIn = await UserAccount.findOne({ username: username, password: hash })
    .select('-password') // Excludes password from result so it is not sent to front-end
    .then(result => {
      return result
    })
  return loggedIn
}

module.exports.validLogin = validLogin
