/**
 * Module
 * Creation Date: 16/01/2021
 * Last Edit Date: 16/01/2021
 * Authors: Ethan Cowey
 * Overview: This is for the AffinityQuestions schema in the database. It can be used as a constructor by importing the
 * file as the constructor named AffinityQuestions as it is exported by that constructor name which is in upper camel
 * case as is good practice for constructors. It defines 4 properties the first is the unique id of the document,
 * The question a string to be asked, an array of possible answers to the question, correct is a string representing the
 * correct option and bonus is for an option that is not fully correct but still scores points.
 */
const mongoose = require('mongoose')

const affinitySchema = mongoose.Schema({
  stream: String,
  question: String,
  options: Array,
  correct: String,
  bonus: String
})

module.exports = mongoose.model('AffinityQuestions', affinitySchema)
