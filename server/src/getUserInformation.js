const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Users = require('./user') // Constructor for useraccounts collection in the database
const Scores = require('./scores') // Constructor for scores collection in the databse

async function getUserInformation () {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const topScores = await Scores.aggregate(
    [
      {
        $group:
              {
                _id: '$username',
                total: { $sum: '$score' }
              }
      },
      { $sort: { total: -1 } }

    ]
  )
    .then(doc => {
      return doc
    })
  const usersRetrieved = await Users.find()
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
