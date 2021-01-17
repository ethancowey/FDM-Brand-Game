/**
 * Module: retrieveQuestion.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 01/01/2021
 * Authors: Miles Prosser, Ethan Cowey
 * Overview: Method originally part of index.js moved for better unit testing. Takes as parameters the stream to
 * get a question from (the topic). As well as the request and response parameters. Using the database uri it connects
 * to the database and queries it for one question of that stream and returns it. Index.js calls this method when a
 * request is made by the front-end to retrieve a question it will return the result of this method to the front-end
 * using res.send(doc)
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Questions = require('./constructors/questions') // Constructor for Questions collection in the database

async function getQuestion (stream) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true, // These are used to fix depreciation conflicts with the MONGO DB node.js driver and mongoose
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const questionRetrieved = await Questions.find({ stream: stream }) // Finds all documents of that stream
    .then(question => {
      return question
    })
  return questionRetrieved
}

module.exports.getQuestion = getQuestion
