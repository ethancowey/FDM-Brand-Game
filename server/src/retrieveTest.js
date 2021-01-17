/**
 * Module:
 * Creation Date: 16/01/2021
 * Last Edit Date: 16/01/2021
 * Authors:Ethan Cowey
 * Overview: This module uses our URI to connect to our mongo database it then assigns a variable to a promise that
 * queries the AffinityQuestions schema for all test questions of the stream type passed to this function. This method
 * is called by index.js when it receives a request from the front-end to get the test questions.
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const AffinityQuestions = require('./constructors/affinityQuestions') // Constructor for affinity tests collection

async function getTest (stream) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true, // These are used to fix depreciation conflicts with the MONGO DB node.js driver and mongoose
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const testRetrieved = await AffinityQuestions.find({ stream: stream }) // Finds all tests of that stream
    .then(test => {
      return test
    })
  return testRetrieved
}

module.exports.getTest = getTest
