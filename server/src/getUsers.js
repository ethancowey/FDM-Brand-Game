/**
 * Creation Date: 20/12/2020
 * Last Edit Date: 25/01/2020
 * Author: Maria Andrzejewska
 * Description: Method for obtaining the all stored information on registered users. Using the database uri it connects
 * to the database, queries it and returns all user data. It then returns this information to the front end using
 * res.send(doc)
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Users = require('./user') // Constructor for useraccounts collection in the database

async function getUsers () {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const usersRetrieved = await Users.find()
    .then(doc => {
      return doc
    })
  return usersRetrieved
}

module.exports.getUsers = getUsers
