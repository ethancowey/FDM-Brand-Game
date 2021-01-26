/**
 * Module: retrieveQuestion.js
 * Creation Date: 15/1/2021
 * Last Edit Date: 15/01/2021
 * Authors: Miles Prosser
 * Description: Method for obtaining all scores for a specific User. Using the database uri it connects
 * to the database, queries it and returns all user data. It then returns this information to the front end
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
  const scoreReceived = await Scores.find({ username: username }) // gets all scores for username queried
    .then(score => {
      return score
    })
  return scoreReceived
}

module.exports.getScore = getScore
