/**
 * Module: retrieveTest.test.js
 * Creation Date: 18/01/2021
 * Last Edit Date: 18/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test the retrieveTest.js method which retrieves affinity test questions from the
 * database for a given input being the stream to get questions for.
 * @jest-environment node
 */
/* eslint-disable no-undef */
const retrieveTest = require('../../server/src/retrieveTest')

test('Retrieve test questions for Software Testing', async () => {
  const correctQuestions = await retrieveTest.getTest('Software Testing')
  expect(correctQuestions[0].stream).toBe('Software Testing')
})

test('Retrieve test questions for  Technical Operations', async () => {
  const correctQuestions = await retrieveTest.getTest('Technical Operations')
  expect(correctQuestions[0].stream).toBe('Technical Operations')
})

test('Retrieve test questions for Business Intelligence', async () => {
  const correctQuestions = await retrieveTest.getTest('Business Intelligence')
  expect(correctQuestions[0]).toBe('Business Intelligence')
})

test('Retrieve no test questions due to erroneous input', async () => {
  const correctQuestions = await retrieveTest.getTest('Not a Stream')
  expect(correctQuestions.toString()).toBe('')
})
