/**
 * Module: register.test.js
 * Creation Date: 03/02/2021
 * Last Edit Date: 04/02/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test register.js which exports the method addUser() this method takes an input of
 * a object made by the UserAccount constructor. It inserts it into the database as a JSON document. The method returns
 * the inserted document but removes the password so its never sent to the front-end for security. So the testing method
 * checks that the document added to the database matches the object inputted minus the hashed password.
 * @jest-environment node
 */
/* eslint-disable no-undef */
const mongoose = require('mongoose') // required for UserAccount constructor
const register = require('../../../server/src/register.js') // Method we are testing
const UserAccount = require('../../../server/src/constructors/user') // Constructor for User Account collection in the database

const newUser = new UserAccount({
  _id: new mongoose.Types.ObjectId(),
  firstname: 'Unit',
  lastname: 'Test',
  username: 'unitTestAccount',
  password: 'fab3dffd86640104e63f0a24ae4bffead6fe04af38d394d8f503e995e75ff58a',
  email: 'testing@test.com'
})

test('Testing inserting an account', async () => {
  const registration = await register.addUser(newUser)
  expect(registration.username).toBe(newUser.username)
})

const smallestInputs = new UserAccount({
  _id: new mongoose.Types.ObjectId(),
  firstname: 'U',
  lastname: 'T',
  username: 'u',
  password: 'fab3dffd86640104e63f0a24ae4bffead6fe04af38d394d8f503e995e75ff58a',
  email: 't@t'
})

test('Testing inserting the smallest values possible', async () => {
  const registration = await register.addUser(smallestInputs)
  expect(registration.username).toBe(smallestInputs.username)
})

const longUsernameInputs = new UserAccount({
  _id: new mongoose.Types.ObjectId(),
  firstname: 'IHaveALongFirstName',
  lastname: 'IHaveALongerLastName',
  username: '10CharsAdd',
  password: 'fab3dffd86640104e63f0a24ae4bffead6fe04af38d394d8f503e995e75ff58a',
  email: 'longUsername@testLong.com'
})

test('Testing inserting the largest username (10 chars) value possible', async () => {
  const registration = await register.addUser(longUsernameInputs)
  expect(registration.username).toBe(longUsernameInputs.username)
})

const specialChars = new UserAccount({
  _id: new mongoose.Types.ObjectId(),
  firstname: 'Test!',
  lastname: '?tester',
  username: 'SpecialCha£s',
  password: 'fab3dffd86640104e63f0a24ae4bffead6fe04af38d394d8f503e995e75ff58a',
  email: 'specialChars*@testSpecial.com'
})

test('Testing inputs with special characters', async () => {
  const registration = await register.addUser(specialChars)
  expect(registration.username).toBe(specialChars.username)
  expect(registration.firstname).toBe(specialChars.firstname)
  expect(registration.lastname).toBe(specialChars.lastname)
  expect(registration.email).toBe(specialChars.email)
})

const numberAccount = new UserAccount({
  _id: new mongoose.Types.ObjectId(),
  firstname: 'Test1',
  lastname: '2tester',
  username: '3',
  password: 'fab3dffd86640104e63f0a24ae4bffead6fe04af38d394d8f503e995e75ff58a',
  email: '35@35.com'
})

test('Testing inputs with numeric characters', async () => {
  const registration = await register.addUser(numberAccount)
  expect(registration.username).toBe(numberAccount.username)
  expect(registration.firstname).toBe(numberAccount.firstname)
  expect(registration.lastname).toBe(numberAccount.lastname)
  expect(registration.email).toBe(numberAccount.email)
})
