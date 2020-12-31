/* eslint-disable no-undef */
const hash = require('../src/hash.js')

test('Hahsing of username ethan and password pass gives correct sha256 hash once salted', () => {
  expect(hash.hashing('ethan', 'pass'))
    .toBe('832f6101280c3d3fc3529c172b98421347a4e01965a26540ba46b469d268dafe')
})

test('Hahsing the smallest possible input username and password', () => {
  expect(hash.hashing('a', 'aaaaaa'))
    .toBe('624407e6be53a4833e7b674db32660f1cf1a97d20d9f09f227868a523d86b4d4')
})

test('Hahsing the largest input for password (12 chars)', () => {
  expect(hash.hashing('a', 'aaaaaaaaaaaa'))
    .toBe('fab3dffd86640104e63f0a24ae4bffead6fe04af38d394d8f503e995e75ff58a')
})

test('Hahsing the largest input for username (10 chars) and password (12 chars)', () => {
  expect(hash.hashing('aaaaaaaaaa', 'aaaaaaaaaaaa'))
    .toBe('2438404c4981e3fd05aff6ac175d2fd066711acad631988e2de0a9edcc82b1e1')
})
