/**
 * Module updateScore.js
 * Creation Date: 06/01/2021
 * Last Edit Date: 06/01/2021
 * Authors: Ethan Cowey
 * Overview:
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Scores = require('./constructors/scores')

async function changeScore (latestScore) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const updatedScore = await Scores.findOneAndUpdate({ username: latestScore.username }, latestScore, { upsert: true, new: true })
    .then(updateComplete => {
      return updateComplete
    })
  console.log(updatedScore)
  return updatedScore
}

module.exports.changeScore = changeScore
