/**
 * Module: updateScore.test.js
 * Creation Date: 06/02/2021
 * Last Edit Date: 06/02/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test updateScore.js which exports the method changeScore(). The method is used after
 * completion of one of the games to update the highscore of the user. If the user doesn't have an entry it creates one.
 * If there is an entry and the new highscore is achieved the document in the database is updated otherwise it remains
 * the sames
 * @jest-environment node
 */
/* eslint-disable no-undef */
const updateScore = require('../../../server/src/scores/updateScore') // Method we are testing
const Scores = require('../../../server/src/constructors/scores') // Constructor for Scores collection in the database

const newScore = new Scores({
  username: 'TestCase',
  game: 'blocks',
  stream: 'Software Testing',
  score: 80
})

test('Testing inserting a new score', async () => {
  const scoreAdd = await updateScore.changeScore(newScore)
  expect(scoreAdd.score).toBe(80)
})

const lowScore = new Scores({
  username: 'TestCase',
  game: 'blocks',
  stream: 'Software Testing',
  score: 50
})
test('Testing inserting a lower score than the one in the current document', async () => {
  const scoreAdd = await updateScore.changeScore(lowScore)
  expect(scoreAdd.score).toBe(80) // score will remain 80 in database not 50 as 50<80
})

const highScore = new Scores({
  username: 'HighTest',
  game: 'blocks',
  stream: 'Software Testing',
  score: 100
})
test('Testing inserting a higher score than the one in the current document', async () => {
  const scoreAdd = await updateScore.changeScore(highScore)
  expect(scoreAdd.score).toBe(100) // score will remain 80 in database not 50 as 50<80
})

const errorScore = new Scores({
  username: 'TestCase',
  game: 'blocks',
  stream: 'Software Testing',
  score: null
})

test('Testing error score of null does not overwrite other scores', async () => {
  const scoreAdd = await updateScore.changeScore(errorScore)
  expect(scoreAdd.score).toBe(80)
})
