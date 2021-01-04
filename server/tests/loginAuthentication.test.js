/**
 * Module: loginAuthentication.test.js
 * Creation Date: 02/01/2021
 * Last Edit Date: 02/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test loginAuthetication.js which exports the method valiLogin() It takes the
 * parameters of the hashed password and username. It checks for a document that matches these credetials and returns it
 * but exccludes the password from the returned document so its never sent to the front-end for security. So this test
 * checks that a username and hashed password combination returns the database entry that matches without the hash.
 * @jest-environment node
 */
/* eslint-disable no-undef */
const loginAuthentication = require('../src/loginAuthentication.js')

test('Testing a valid username and hash', async () => {
  const correctLogin = await loginAuthentication.validLogin(
    'f6179ed4db729720155d82b03b033f27bbb4b64e3e9651a1b1dce6a7675fb78b', 'LoginTest')
  expect(correctLogin.username).toBe('LoginTest')
})

test('Testing a valid username and invalid hash', async () => {
  const incorrectHash = await loginAuthentication.validLogin(
    'incorrectb729720155d82b03b033f27bbb4b64e3e9651a1b1dce6a7675fb78b', 'LoginTest')
  expect(incorrectHash).toBe(null)
})

test('Testing a invalid username and valid hash for another account', async () => {
  const incorrectUsername = await loginAuthentication.validLogin(
    'f6179ed4db729720155d82b03b033f27bbb4b64e3e9651a1b1dce6a7675fb78b', 'InvalidLoginTest')
  expect(incorrectUsername).toBe(null)
})

test('Testing an invalid username and hash', async () => {
  const failedLogin = await loginAuthentication.validLogin(
    'f6179ed4db729720155d82b03b033f27bbb4b64e3e9651a1b1dce6a7675fb78b', 'FailedTest')
  expect(failedLogin).toBe(null)
})

test('Testing an valid username and hash with username of shortest length (1 char)', async () => {
  const shortUsername = await loginAuthentication.validLogin(
    '4845ee18f0cfd3109768026bf1cde9f06f2488b59bf2743bdbe0d0112e641c12', 'T')
  expect(shortUsername.username).toBe('T')
})

test('Testing an valid username and hash with username of the longest length (10 chars)', async () => {
  const longUsername = await loginAuthentication.validLogin(
    'e5938d4780f861f2fab317d6d1ee1ff1fd150e91740681027fc2b4334c605e2f', '10CharExis')
  expect(longUsername.username).toBe('10CharExis')
})

test('Testing an valid username and but invalid hash with username of shortest length', async () => {
  const shortUsername = await loginAuthentication.validLogin(
    'invalidf0cfd3109768026bf1cde9f06f2488b59bf2743bdbe0d0112e641c12', 'T')
  expect(shortUsername).toBe(null)
})

test('Testing an valid username and hash with username of the longest length', async () => {
  const longUsername = await loginAuthentication.validLogin(
    'invalid4780f861f2fab317d6d1ee1ff1fd150e91740681027fc2b4334c605e2f', '10CharExis')
  expect(longUsername).toBe(null)
})
