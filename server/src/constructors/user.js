/**
 * Module user.js
 * Creation Date: 11/12/2020
 * Last Edit Date: 11/12/2020
 * Authors: Ethan Cowey
 * Overview: This is for the UserAccount schema in the database. It can be used as a constructor by importing the
 * file as the constructor named UserAccount as it is exported by that constructor name which is in upper camel case as
 * is good practice for constructors. It defines 6 properties the users firstname, the users lastname, the username made
 * by the user, the users password which will be salted and hashed before adding it to the database, the users email and
 * if the user is an admin or not which on registration we set to false and manually change in the database to make
 * admins. Ids are made automatically on insertion to mongoDB.
 */
const mongoose = require('mongoose')

const userAccountSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String,
  admin: String
})

module.exports = mongoose.model('UserAccount', userAccountSchema)
