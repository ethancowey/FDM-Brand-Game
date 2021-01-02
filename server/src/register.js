/**
 * Module loginAuthentication.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 31/12/2020
 * Authors: Ethan Cowey
 * Description: This is to replace the original method to register users that was in index.js. This takes as parameters
 * The object made by a constructor called NewUser this is in the form we need to put in the database as well as
 * request and response variables to send data back to the user. It works by connecting to the database using the uri
 * and using .save() to save the new data it then confirms the transaction with a response to the front end using
 * res.send(result)
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'

async function addUser (NewUser, req, res) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const addUser = await NewUser.save()
    .then(result => {
      return result
    })
  return addUser
}

module.exports.addUser = addUser
