/**
 * Module: hashTest.test.js
 * Creation Date: 31/12/2020
 * Last Edit Date: 31/12/2020
 * Authors: Ethan Cowey
 * Overview: This module is used to test the hashing method hash.js each test passes to the method the username and
 * password to salt and hash and should return the correct salted hash.
 * It should hash the username add the result as a salt to the end of the password. Then hash the password and salt
 * together and return that result.
 * @jest-environment node
 */
/* eslint-disable no-undef */
const hash = require('../src/hash.js')

test('Hashing of username ethan and password pass gives correct sha256 hash once salted', () => {
  expect(hash.hashing('ethan', 'pass'))
    .toBe('832f6101280c3d3fc3529c172b98421347a4e01965a26540ba46b469d268dafe')
})

test('Hashing the smallest possible input username(1 char) and password (6 char)', () => {
  expect(hash.hashing('a', 'aaaaaa'))
    .toBe('624407e6be53a4833e7b674db32660f1cf1a97d20d9f09f227868a523d86b4d4')
})

test('Hashing the largest input for password (12 chars)', () => {
  expect(hash.hashing('a', 'aaaaaaaaaaaa'))
    .toBe('fab3dffd86640104e63f0a24ae4bffead6fe04af38d394d8f503e995e75ff58a')
})

test('Hashing the largest input for username (10 chars) and password (12 chars)', () => {
  expect(hash.hashing('aaaaaaaaaa', 'aaaaaaaaaaaa'))
    .toBe('2438404c4981e3fd05aff6ac175d2fd066711acad631988e2de0a9edcc82b1e1')
})

test('Hashing the largest input for username (10 chars) and smallest password (6 chars)', () => {
  expect(hash.hashing('tenChars10', 'sixcha'))
    .toBe('637bcb8521628ba618fe64a78b953a06d1aef3a8b5d9afb361cbeca5577bb794')
})

test('Hashing an input with special characters and numbers', () => {
  expect(hash.hashing('Sp3cial!', 'Ch£rs99'))
    .toBe('7e58cc25020d23fb9212a7e5affa7e5d49749490b0bab053370e197bd58adafe')
})
