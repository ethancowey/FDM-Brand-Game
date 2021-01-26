/**
 * Module: hash.js
 * Creation Date: 19/12/2020
 * Last Edit Date: 19/12/2020
 * Authors: Ethan Cowey
 * Overview: This method takes the parameters of the a username and password. It uses the crypto libary methods to
 * preform sha256 hashing. First it generates a salt by hashing the username with sha256. Then we hash the password with
 * the salt combined to the end of it again using sha256. It will then return the sha 256 hash.
 */
const crypto = require('crypto')

function hashing (username, password) {
  const salt = crypto.createHash('sha256')
    .update(username)
    .digest('hex')
  const hash = crypto.createHash('sha256')
    .update(password + salt)
    .digest('hex')
  return (hash)
}
module.exports.hashing = hashing
