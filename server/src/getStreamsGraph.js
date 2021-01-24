const mongoose = require('mongoose')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const Scores = require('./scores') // Constructor for Questions collection in the database

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
