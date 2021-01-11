/**
 * Module user.js
 * Creation Date: 11/12/2020
 * Last Edit Date: 11/12/2020
 * Authors: Ethan Cowey
 * Overview: This is for the UserAccount schema in the database. It can be used as a constructor by importing the
 * file as the constructor named UserAccount as it is exported by that constructor name which is in upper camel case as
 * is good practice for constructors. It defines 6 properties the id of the document which is generated, the users
 * firstname, the users lastname, the username made by the user, the users password which will be salted and hashed
 * before adding it to the database and the users email.
 */
const mongoose = require('mongoose')

const userAccountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  email: String
})

module.exports = mongoose.model('UserAccount', userAccountSchema)
