const mongoose = require('mongoose')

const scoresSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    game: String,
    username: String,
    score: Number,
});

module.exports = mongoose.model('Scores', scoresSchema)