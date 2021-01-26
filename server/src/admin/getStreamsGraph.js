/**
 * Creation Date: 21/01/2020
 * Last Edit Date: 25/01/2020
 * Author: Maria Andrzejewska
 * Description: Method for obtaining the data for the stream performance graph. Using the database uri it connects to
 * the database, queries it and groups the scores by stream name. It then returns the stream and its average score
 * to the front end using res.send(doc)
 */
const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Scores = require('../constructors/scores') // Constructor for Questions collection in the database

async function getStreamsGraph () {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then()
  const streamsData = await Scores.aggregate(
    [{
      $group:
            {
              _id: '$stream',
              average: { $avg: '$score' }
            }
    }
    ]
  )
    .then(doc => {
      return doc
    })

  return streamsData
}

module.exports.getStreamsGraph = getStreamsGraph
