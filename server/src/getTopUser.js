/**
 * Creation Date: 18/12/2020
 * Last Edit Date: 25/01/2020
 * Author: Maria Andrzejewska
 * Description: Method for obtaining the total scores of all users and guests. Using the database uri it connects to
 * the database, queries it, groups the scores by username and sums up all the scores existing associated with a
 * specific username. It then sorts the result in a descending order, so that it's easy to determine the top user.
 * It then returns the usernames and the total points ever obtained by users to the front end using res.send(doc)
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Scores = require('./constructors/scores') // Constructor for Questions collection in the database

async function getTopUser () {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const topUserRetrieved = await Scores.aggregate(
    [
      {
        $group:
              {
                _id: '$username',
                score: { $sum: '$score' }
              }
      },
      { $sort: { score: -1 } }

    ]
  )
    .then(doc => {
      return doc
    })

  return topUserRetrieved
}

module.exports.getTopUser = getTopUser
