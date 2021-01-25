/**
 * Creation Date: 25/12/2020
 * Last Edit Date: 25/01/2020
 * Author: Maria Andrzejewska
 * Description: Method for obtaining the data for a user information page. Using the result of already existing
 * methods that query the database for registered users and their information and total scores obtained by users and
 * guests, it iterates through both of those arrays and checks for the same username. If it is found, means that a
 * registered users has scored points, which are then added to the information array to be used in the user
 * information page. If there's no match, it means that those users, although registered, have not scored any points
 * yet, so 0 points is added to the information array as their total score.
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Users = require('./getUsers')
const Scores = require('./getTopUser')

async function getUserInformation () {
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
  const Information = []
  for (const user of usersRetrieved) {
    let total
    let found
    for (const score of topScores) {
      if (user.username === score._id) {
        found = true
        total = score.total
        break
      } else {
        found = false
      }
    }
    if (found) {
      Information.push({
        total: total,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      })
    } else {
      Information.push({
        total: 0,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      })
    }
  } return Information
}
module.exports.getUserInformation = getUserInformation
