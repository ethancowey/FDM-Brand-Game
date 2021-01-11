/**
 * Module: usernameExist.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 04/01/2021
 * Authors: Ethan Cowey
 * Overview: This is to replace the original check if the username is unique that was in index.js to allow better
 * unit testing. It takes as parameters the username parameters. It will then using the database connection uri connect
 * to the database then makes a query to that database which will if the username exists return that document or if not
 * it returns null. So if the user exists the method will return 'exists' and if its unique it will return null.
 * This method is invoked in the front-end by an axios request to index.js which will send a response to the front=end
 * if that username exists using res.send(doc) based on the result of this method.
 */
const mongoose = require('mongoose')
const UserAccount = require('./user') // Constructor for User Account collection in the database
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'

async function isUsernameUnique (username) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then()
  const exists = await UserAccount.findOne({ username: username })
    .then(result => {
      return result
    })
  console.log(exists)
  if (exists != null) {
    return 'exists'
  } else {
    return null
  }
}

module.exports.isUsernameUnique = isUsernameUnique
