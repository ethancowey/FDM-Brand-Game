/**
 * Module scores.js
 * Creation Date: 11/12/2020
 * Last Edit Date: 11/12/2020
 * Authors: Ethan Cowey
 * Overview: This is for the Scores schema in the database. It can be used as a constructor by importing the
 * file as the constructor named Scores as it is exported by that constructor name which is in upper camel case as
 * is good practice for constructors. It defines 4 properties for the scores schema in the database they are the game
 * the score was achieved in, the stream the game the score is for, the username of the user who achieved that score and
 * the score value itself.
 */
const mongoose = require('mongoose')

const scoresSchema = mongoose.Schema({
  game: String,
  username: String,
  stream: String,
  score: Number
})

module.exports = mongoose.model('Scores', scoresSchema)
