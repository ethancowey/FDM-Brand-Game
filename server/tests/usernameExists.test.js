/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
const usernameExists = require('../src/usernameExist.js')

test('Test the return if username does exist', async () => {
  const exists = await usernameExists.isUsernameUnique('doddod')
  expect(exists.username).toBe('doddod')
})

test('Test the return if username does exist for another valid username', async () => {
  const exists = await usernameExists.isUsernameUnique('testing')
  expect(exists.username).toBe('doddod')
})

test('Testing a new unique username passed to the function returns null', async () => {
  const exists = await usernameExists.isUsernameUnique('UNIQUEUSERNAME')
  expect(exists).toBe(null)
})

test('Testing a username passed exists of the smallest username (1 chars)' +
    ' accepted by frontend', async () => {
  const exists = await usernameExists.isUsernameUnique('T')
  expect(exists.username).toBe('T')
})

test('Testing a new unique username passed to the function returns null of the largest username (10 chars)' +
    ' accepted by frontend', async () => {
  const exists = await usernameExists.isUsernameUnique('10CharExis')
  expect(exists.username).toBe('10CharExis')
})

test('Testing a new unique username passed to the function returns null of smallest username (1 chars)' +
    ' accepted by frontend', async () => {
  const exists = await usernameExists.isUsernameUnique('*')
  expect(exists).toBe(null)
})

test('Testing a new unique username passed to the function returns null of the largest username (10 chars)' +
    ' accepted by frontend', async () => {
  const exists = await usernameExists.isUsernameUnique('10CharUniq')
  expect(exists).toBe(null)
})
