/**
 * Module questions.js
 * Creation Date: 11/12/2020
 * Last Edit Date: 11/12/2020
 * Authors: Ethan Cowey
 * Overview: This is the Questions schema in the database. It can be used as a constructor by importing the
 * file as the constructor named Questions as it is exported by that constructor name which is in upper camel case as
 * is good practice for constructors. It defines 4 properties the first is the id of the document,
 * the second stream the question is a part of, the third is the term of the question and the fourth the
 * meaning of that term.
 */
const mongoose = require('mongoose')

const questionsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stream: String,
  term: String,
  meaning: String
})

module.exports = mongoose.model('Questions', questionsSchema)
