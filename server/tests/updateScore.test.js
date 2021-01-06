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
const updateScore = require('../src/updateScore') // Method we are testing
const Scores = require('../src/constructors/scores') // Constructor for Scores collection in the database

const newScore = new Scores({
  username: 'TestCase',
  game: 'blocks',
  stream: 'Software Testing',
  score: 80
})

test('Testing inserting a score', async () => {
  const scoreAdd = await updateScore.changeScore(newScore)
  expect(scoreAdd.score).toBe(80)
})

const lowScore = new Scores({
  username: 'TestCase',
  game: 'blocks',
  stream: 'Software Testing',
  score: 50
})
test('Testing inserting a lower score', async () => {
  const scoreAdd = await updateScore.changeScore(lowScore)
  expect(scoreAdd.score).toBe(80) // score will remain 80 in database not 50 as 50<80
})
