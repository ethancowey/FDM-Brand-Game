/**
 * Module:usernameExists.test.js
 * Creation Date: 01/01/2021
 * Last Edit Date: 02/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test usernameExists.js which exports the method isUsernameUnique() the method takes
 * an input of a username it queries the database for a match. If it finds a match it returns the string 'exists'.
 * Otherwise it returns null signifying it is unique.
 * @jest-environment node
 */
/* eslint-disable no-undef */
const usernameExists = require('../../server/src/usernameExist.js')

test('Test the return if username does exist', async () => {
  const exists = await usernameExists.isUsernameUnique('doddod')
  expect(exists).toBe('exists')
})

test('Test the return if username does exist for another valid username', async () => {
  const exists = await usernameExists.isUsernameUnique('testing')
  expect(exists).toBe('exists')
})

test('Testing a new unique username passed to the function returns null', async () => {
  const exists = await usernameExists.isUsernameUnique('UNIQUE')
  expect(exists).toBe(null)
})

test('Testing a username passed exists of the smallest username (1 chars)' +
    ' accepted by frontend', async () => {
  const exists = await usernameExists.isUsernameUnique('T')
  expect(exists).toBe('exists')
})

test('Testing an existing username passed to the function returns exists of the largest username (10 chars)' +
    ' accepted by frontend', async () => {
  const exists = await usernameExists.isUsernameUnique('10CharExis')
  expect(exists).toBe('exists')
})

test('Testing a new unique username passed to the function returns null of smallest username (1 chars)' +
    ' accepted by frontend', async () => {
  const exists = await usernameExists.isUsernameUnique('U')
  expect(exists).toBe(null)
})

test('Testing a new unique username passed to the function returns null of the largest username (10 chars)' +
    ' accepted by frontend', async () => {
  const exists = await usernameExists.isUsernameUnique('10CharUniq')
  expect(exists).toBe(null)
})
