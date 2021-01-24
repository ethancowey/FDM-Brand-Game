/**
 * Module: retrieveTest.test.js
 * Creation Date: 24/01/2021
 * Last Edit Date: 24/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test the retrieveQuestion.js method which retrieves questions from the
 * database for a given input being the stream to get questions for.
 * @jest-environment node
 */
/* eslint-disable no-undef */
const retrieveQuestion = require('../../../server/src/retrieveQuestion')

test('Retrieve questions for Software Testing', async () => {
  const correctQuestions = await retrieveQuestion.getQuestion('Software Testing')
  expect(correctQuestions[0].stream).toBe('Software Testing')
})

test('Retrieve questions for  Technical Operations', async () => {
  const correctQuestions = await retrieveQuestion.getQuestion('Technical Operations')
  expect(correctQuestions[0].stream).toBe('Technical Operations')
})

test('Retrieve questions for Business Intelligence', async () => {
  const correctQuestions = await retrieveQuestion.getQuestion('Business Intelligence')
  expect(correctQuestions[0]).toBe('Business Intelligence')
})

test('Retrieve no questions due to erroneous input', async () => {
  const correctQuestions = await retrieveQuestion.getQuestion('Not a Stream')
  expect(correctQuestions.toString()).toBe('')
})
