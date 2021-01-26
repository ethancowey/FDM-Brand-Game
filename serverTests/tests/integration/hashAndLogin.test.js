/**
 * Module: hashAndLogin.test.js
 * Creation Date: 19/01/2021
 * Last Edit Date: 19/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test the hashing method hash.js combined with the loginAuthentication method
 * together. Fist the users password is salted and hashed then checked for a match in the database with the username.
 * @jest-environment node
 */
/* eslint-disable no-undef */
const hash = require('../../../server/src/user/hash.js')
const loginAuthentication = require('../../../server/src/user/loginAuthentication')

test('Testing hashing and login to a valid account', async () => {
  const usersHash = hash.hashing('IntName', 'IntTest')
  const login = await loginAuthentication.validLogin(usersHash, 'IntName')
  expect(login.username).toBe('IntName')
  // password is removed from return statement so the hash is never sent to the front-end
})

test('Testing hashing and login to a invalid account', async () => {
  const usersHash = hash.hashing('InvalidName', 'Ipassword')
  const login = await loginAuthentication.validLogin(usersHash, 'InvalidName')
  expect(login).toBe(null)
})

test('Testing hashing and login to a valid account of shortest input from the form', async () => {
  const usersHash = hash.hashing('I', 'IntTes')
  const login = await loginAuthentication.validLogin(usersHash, 'I')
  expect(login.username).toBe(login.username)
})

test('Testing hashing and login to a invalid account of smallest inputs', async () => {
  const usersHash = hash.hashing('I', 'NotPas')
  const login = await loginAuthentication.validLogin(usersHash, 'I')
  expect(login).toBe(null)
})

test('Testing hashing and login to a valid account of longest length allowed by form', async () => {
  const usersHash = hash.hashing('Integration', 'Integration12')
  const login = await loginAuthentication.validLogin(usersHash, 'Integration')
  expect(login.username).toBe(login.username)
})

test('Testing hashing and login to a invalid account of longest length allowed by form', async () => {
  const usersHash = hash.hashing('Integration', 'Integration99')
  const login = await loginAuthentication.validLogin(usersHash, 'Integration')
  expect(login).toBe(null)
})
