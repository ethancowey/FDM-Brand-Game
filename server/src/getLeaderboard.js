/**
 * Creation Date: 16/12/2020
 * Last Edit Date: 25/01/2020
 * Author: Maria Andrzejewska
 * Description: Method for obtaining the data for a leaderboard. Takes as parameters the game and stream to
 * get a specific leaderboard. Using the database uri it connects to the database and queries it for all scores
 * for that stream-game combination and returns it to the front end using res.send(doc)
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Scores = require('./scores') // Constructor for Questions collection in the database

async function getScores (game, stream) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const leaderboardRetrieved = await Scores.find({ game: game, stream: stream }).sort({ score: -1 })
    .then(doc => {
      return doc
    })
  return leaderboardRetrieved
}

module.exports.getScores = getScores
