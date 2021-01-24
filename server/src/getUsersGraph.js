const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Users = require('./getUsers')
const Scores = require('./getTopUser')
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
  for (const user of usersRetrieved) {
    registered.push({ username: user.username, role: 'registered' })
  }
  usersData[0] = { role: 'registered', amount: registered.length }
  for (const score of topScores) {
    let guest = false
    for (const user of usersRetrieved) {
      if (score._id === user.username) {
        guest = false
        break
      } else {
        guest = true
      }
    }
    if (guest) {
      guests.push({ username: score._id, role: 'guest' })
    }
    usersData[1] = { role: 'guest', amount: guests.length }
  } return usersData
}
module.exports.getUsersGraph = getUsersGraph
