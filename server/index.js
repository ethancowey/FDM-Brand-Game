const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const UserAccount = require('./src/user') // Constructor for User Account collection in the database
const Questions = require('./src/questions') // Constructor for Questions collection in the database
const hashMethod = require('./src/hash.js')
const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/api/auth', (req, res) => {
  console.log('posted')// adds all user details so they can be compared with front end
  const hash = hashMethod.hashing(req.body.username, req.body.password)
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => {
      UserAccount.findOne({ username: req.body.username, password: hash }).find()// find a match in the database
        .then(doc => res.send(doc))
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(`db error ${err.message}`)
      process.exit(-1)
    })
})

app.post('/api/exists', (req, res) => {
  console.log('posted')// adds all user details so they can be compared with front end
  console.log(req.body)
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => {
      UserAccount.findOne({ username: req.body.username })// find a match in the database
        .then(doc => res.send(doc))
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(`db error ${err.message}`)
      process.exit(-1)
    })
})
app.post('/api/register', (req, res) => {
  console.log('posted')// adds all user details so they can be compared with front end
  console.log(req.body)
  const hash = hashMethod.hashing(req.body.username, req.body.password)
  const UserAccounts = new UserAccount({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: hash,
    email: req.body.email
  })
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => {
      UserAccounts.save()
        .then(result => {
          console.log(result)
          res.send(result)
        })
        .catch(err => console.log(err))
    })
})

app.get('/api/questions', function (req, res) {
  mongoose.connect(uriMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => {
      const streams = req.query.streams
      Questions.find({ stream: streams })
        .then(doc => res.send(doc))
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(`db error ${err.message}`)
      process.exit(-1)
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Server Started'))
