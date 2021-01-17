/**
 * Module updateScore.js
 * Creation Date: 06/01/2021
 * Last Edit Date: 06/01/2021
 * Authors: Ethan Cowey
 * Overview: This method takes the parameter of the object made by a constructor called Scores. The object holds the
 * data of the user score to update. The method works by first using a promise to connect to the database once resolved
 * it will start another promise to update the user score if it is higher than the previous score in that document if it
 * exists in the table using $max operator. If a previous item in the database doesn't exist it will make a new one.
 * It then returns the added or updated document.
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Scores = require('./constructors/scores')

async function changeScore (latestScore) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true, // These are used to fix depreciation conflicts with the MONGO DB node.js driver and mongoose
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const updatedScore = await Scores.findOneAndUpdate({
    username: latestScore.username, // parameters to find a document by if one exists
    stream: latestScore.stream,
    game: latestScore.game
  },
  { $max: { score: latestScore.score } }, // update the document with this new score only if the score is higher
  { upsert: true, new: true }) // upsert makes a new document if none exists to update
    .then(updateComplete => {
      return updateComplete // return the document
    })
  return updatedScore
}

module.exports.changeScore = changeScore
