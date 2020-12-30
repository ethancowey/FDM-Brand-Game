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
