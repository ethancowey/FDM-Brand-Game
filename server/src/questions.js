const mongoose = require('mongoose')

const questionsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stream: String,
  term: String,
  meaning: String
})

module.exports = mongoose.model('Questions', questionsSchema)
