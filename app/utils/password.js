const crypto = require('crypto')

const getRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length)
}

const sha512 = (password, salt) => {
  let hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  let value = hash.digest('hex')
  return {
    salt,
    password: value
  }
}

const saltHashPassword = (password) => {
  let salt = getRandomString(16)
  let passwordData = sha512(password, salt)

  return passwordData
}

saltHashPassword.getRandomString = getRandomString
saltHashPassword.sha512 = sha512

module.exports = saltHashPassword
