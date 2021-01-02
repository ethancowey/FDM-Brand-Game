const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const UserAccount = require('./src/user') // Constructor for User Account collection in the database
const hashMethod = require('./src/hash.js')
const loginAuthentication = require('./src/loginAuthentication')
const usernameExist = require('./src/usernameExist')
const register = require('./src/register')
const retrieveQuestions = require('./src/retrieveQuestion')
const app = express()
// const uriMongo = 'mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority'

app.use(bodyParser.json())
app.use(cors())

app.post('/api/auth', async (req, res) => {
  console.log('posted')// adds all user details so they can be compared with front end
  const hash = hashMethod.hashing(req.body.username, req.body.password)
  const userAuthorised = await loginAuthentication.validLogin(hash, req.body.username)
  res.send(userAuthorised)
})

app.post('/api/exists', async (req, res) => {
  console.log('posted')// adds all user details so they can be compared with front end
  const exists = await usernameExist.isUsernameUnique(req.body.username, req, res)
  res.send(exists)
})

app.post('/api/register', async (req, res) => {
  console.log('posted')// adds all user details so they can be compared with front end
  console.log(req.body)
  const hash = hashMethod.hashing(req.body.username, req.body.password)
  const NewUser = new UserAccount({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: hash,
    email: req.body.email
  })
  const addUser = await register.addUser(NewUser)
  res.send(addUser)
})

app.get('/api/questions', async (req, res) => {
  const streams = req.query.streams
  const question = await retrieveQuestions.getQuestion(streams, req, res)
  res.send(question)
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Server Started'))
