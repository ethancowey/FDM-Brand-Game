/**
 * Module: index.js
 * Creation Date: 08/12/2020
 * Last Edit Date: 03/01/2021
 * Authors: Ethan Cowey, Miles Prosser
 * Overview: The purpose of this module is to be the server it will listen on a specific port for requests being made
 * by the front-end. When a request is made to a specific url path which the module is listening on it will preform and
 * call different methods.
 */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const UserAccount = require('./src/constructors/user') // Constructor for User Account collection in the database
const Scores = require('./src/constructors/scores')

const hashMethod = require('./src/hash.js')
const loginAuthentication = require('./src/loginAuthentication')
const usernameExist = require('./src/usernameExist')
const register = require('./src/register')
const retrieveQuestions = require('./src/retrieveQuestion')
const resetPass = require('./src/resetPassword')
const retrieveUsersScore = require('./src/retrieveUsersScore')
const updateScore = require('./src/updateScore')
const retrieveTests = require('./src/retrieveTest')
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
  const hash = hashMethod.hashing(req.body.username, req.body.password)
  const newUser = new UserAccount({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: hash,
    email: req.body.email
  })
  const addUser = await register.addUser(newUser)
  res.send(addUser)
})

app.post('/api/resetpass', async (req, res) => {
  const hash = hashMethod.hashing(req.body.username, req.body.password)
  const updatePassword = await resetPass.updatePass(hash, req.body.username)
  res.send(updatePassword)
})


app.get('/api/questions', async (req, res) => {
  const streams = req.query.streams
  const question = await retrieveQuestions.getQuestion(streams, req, res)
  res.send(question)
})

app.get('/api/scores', async (req, res) => {
  const username = req.query.username
  const scores = await retrieveUsersScore.getScore(username, req, res)
  res.send(scores)
})

app.get('/api/affinitytests', async (req, res) => {
  const streams = req.query.streams // The stream to get the test for
  const test = await retrieveTests.getTest(streams) // Gets the test questions for that stream
  res.send(test) // Sends the test back to the front-end
})

app.post('/api/scores', async (req, res) => {
  const newScore = new Scores({
    username: req.body.username,
    game: req.body.game,
    stream: req.body.stream,
    score: req.body.score
  })
  const addScore = updateScore.changeScore(newScore)
  res.send(addScore)
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Server Started'))
