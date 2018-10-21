const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordUtil = require('../utils/password')

let UserSchema = new Schema({
  username: String,
  fullname: {
    type: String,
    required: false,
    default: 'Anonymous'
  },
  securedPassword: String,
  salt: String
});

UserSchema.virtual('password').set(function (password) {
  let data = passwordUtil(password)
  this.securedPassword = data.password
  this.salt = data.salt
}).get(function (){
  return this.securedPassword
})

UserSchema.methods.validatePassword = function (password) {
  return passwordUtil.sha512(password, this.salt).password === this.securedPassword
}

mongoose.model('User', UserSchema);

