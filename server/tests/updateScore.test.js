/**
 * Module: register.test.js
 * Creation Date: 06/02/2021
 * Last Edit Date: 06/02/2021
 * Authors: Ethan Cowey
 * Overview:
 * @jest-environment node
 */
/* eslint-disable no-undef */
const updateScore = require('../src/updateScore') // Method we are testing
const Scores = require('../src/constructors/scores') // Constructor for Scores collection in the database

const newScore = new Scores({
  username: 'TestCase6',
  game: 'blocks',
  stream: 'Software Testing',
  score: 80
})

test('Testing inserting a score', async () => {
  const scoreAdd = await updateScore.changeScore(newScore)
  expect(scoreAdd.score).toBe(80)
})
