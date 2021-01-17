/**
 * Module: register.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 04/01/2021
 * Authors: Ethan Cowey
 * Overview: This is to replace the original method to register users that was in index.js. This takes as parameters
 * the object made by a constructor called NewUser this is in the form we need to put in the database.
 * It works by connecting to the database using the uri and using .save() to save the new data it then confirms the
 * transaction by returning the resulting document but removes the password from it so its not sent to the front-end.
 * As this method is invoked when the front-end sends a post request to register to index.js which calls this method
 * it will also return the result of this method (without the password) to the front-end using res.send()
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'

async function addUser (newUser) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true, // These are used to fix depreciation conflicts with the MONGO DB node.js driver and mongoose
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const userSaved = await newUser.save()
    .then(result => {
      return result
    })
  const passwordExcludedUser = userSaved.toObject()
  delete passwordExcludedUser.password // Remove password from result so its not sent to front-end
  return passwordExcludedUser
}

module.exports.addUser = addUser
