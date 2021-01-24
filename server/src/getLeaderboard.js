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
