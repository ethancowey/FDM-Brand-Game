/**
 * Module: retrieveQuestion.js
 * Creation Date: 15/1/2021
 * Last Edit Date: 15/01/2021
 * Authors: Miles Prosser
 * Retrieves Specific user scores
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Scores = require('../constructors/scores') // Constructor for Scores collection in the database

async function getScore (username) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const scoreReceived = await Scores.find({ username: username })
    .then(score => {
      return score
    })
  return scoreReceived
}

module.exports.getScore = getScore
