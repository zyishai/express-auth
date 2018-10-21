const BasicStrategy = require('passport-local').Strategy
const User = require('mongoose').model('User')

module.exports = (passport) => {
  passport.use('local-register', new BasicStrategy({
    passReqToCallback: true
  }, function(req, username, password, done) {
    let newUser = new User({
      username,
      password,
      fullname: req.body.fullname
    })

    newUser.save(function(err, user) {
      if (err) return done(err)
      if (!user) return done(null, false)
      return done(null, user)
    })
  }))

  passport.use('local-login', new BasicStrategy(
    function(username, password, done) {
      User.findOne({ username }, function(err, user) {
        if (err) return done(err)
        if (!user) return done(null, false)
        if (!user.validatePassword(password)) return done(null, false)

        return done(null, user)
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, {
      id: user.id,
      username: user.username,
      fullname: user.fullname
    })
  })

  passport.deserializeUser(function({ id }, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })
}
