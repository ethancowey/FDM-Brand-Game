/**
 * Creation Date: 18/01/2020
 * Last Edit Date: 25/01/2020
 * Author: Maria Andrzejewska
 * Description: Method for obtaining the data for the user types graph. It uses already existing methods that return
 * all stored information on registered users and all existing scores to obtain the amount of registered users and
 * guests. The amount of registered users is obtained through using the .length method on the array containing data from
 * the useraccounts collection. In order to find the amount of guests, the method checks if a score in the topUsers
 * array has been obtained by a registered user. If not, it's pushed to the array of guests. The front end receives
 * an array in the format [{role: "registered", amount: number}, {role:"guest", amount: number}] so that it's ready
 * to use.
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Users = require('../scores/getUsers')
const Scores = require('../scores/getTopUser')
async function getUsersGraph () {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const topScores = await Scores.getTopUser()
    .then(doc => {
      return doc
    })
  const usersRetrieved = await Users.getUsers()
    .then(doc => {
      return doc
    })
  const usersData = []
  const registered = []
  const guests = []
  for (const user of usersRetrieved) { // adding all registered users to the registered array
    registered.push({ username: user.username, role: 'registered' })
  }
  // pushing information on registered users into a general array
  usersData[0] = { role: 'registered', amount: registered.length }
  for (const score of topScores) {
    let guest = false
    // checking if any user who has generated a score is registered
    for (const user of usersRetrieved) {
      if (score._id === user.username) {
        guest = false // if they are found in the user accounts collection, they are registered
        break
      } else {
        guest = true // if the username is not found, they are a guest
      }
    }
    if (guest) { // adding all guest users to an array
      guests.push({ username: score._id, role: 'guest' })
    }
    // adding the information on guest users to the general array
    usersData[1] = { role: 'guest', amount: guests.length }
  } return usersData
}
module.exports.getUsersGraph = getUsersGraph
