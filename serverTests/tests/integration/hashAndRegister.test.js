/**
 * Module: hashAndRegister.test.js
 * Creation Date: 19/01/2021
 * Last Edit Date: 19/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test the hashing method hash.js combined with the registration method
 * together fist the users password is salted and hashed then added to the database.
 * @jest-environment node
 */
/* eslint-disable no-undef */
const mongoose = require('mongoose')
const hash = require('../../../server/src/hash.js')
const register = require('../../../server/src/register')
const UserAccount = require('../../../server/src/constructors/user')

test('Testing hashing and inserting an account', async () => {
  const usersHash = hash.hashing('IntName', 'IntTest')
  const newUser = new UserAccount({
    _id: new mongoose.Types.ObjectId(),
    firstname: 'Int',
    lastname: 'Test',
    username: 'IntName',
    password: usersHash,
    email: 'testing@test.com'
  })
  expect(newUser.password).toBe(usersHash)
  const registration = await register.addUser(newUser)
  expect(registration.username).toBe(newUser.username)
  // expect(registration.password).toBe(usersHash)
  // password is removed from return statement so the hash is never sent to the front-end
})

test('Testing hashing and inserting an account of shortest inputs from front-end', async () => {
  const usersHash = hash.hashing('I', 'IntTes')
  const newUser = new UserAccount({
    _id: new mongoose.Types.ObjectId(),
    firstname: 'Int',
    lastname: 'Test',
    username: 'I',
    password: usersHash,
    email: 'testing@test.com'
  })
  expect(newUser.password).toBe(usersHash)
  const registration = await register.addUser(newUser)
  expect(registration.username).toBe(newUser.username)
  // expect(registration.password).toBe(usersHash)
  // password is removed from return statement so the hash is never sent to the front-end
})

test('Testing hashing and inserting an account of longest inputs from front-end', async () => {
  const usersHash = hash.hashing('Integration', 'Integration12')
  const newUser = new UserAccount({
    _id: new mongoose.Types.ObjectId(),
    firstname: 'Int',
    lastname: 'Test',
    username: 'Integration',
    password: usersHash,
    email: 'testing@test.com'
  })
  expect(newUser.password).toBe(usersHash)
  const registration = await register.addUser(newUser)
  expect(registration.username).toBe(newUser.username)
  // expect(registration.password).toBe(usersHash)
  // password is removed from return statement so the hash is never sent to the front-end
})
