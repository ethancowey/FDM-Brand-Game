/**
 * Module loginAuthentication.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 31/12/2020
 * Authors: Miles Prosser, Ethan Cowey
 * Description: Method originally part of index.js moved for better unit testing. Takes as parameters the stream to
 * get a question from (the topic). As well as the request and response parameters. Using the database uri it connects
 * to the database and querues it for one question of that stream and returns it to the front end using res.send(doc)
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Questions = require('./questions') // Constructor for Questions collection in the database

async function getQuestion (stream) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const questionRetrieved = await Questions.find({ stream: stream })
    .then(doc => {
      return doc
    })
  return questionRetrieved
}

module.exports.getQuestion = getQuestion
