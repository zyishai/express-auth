const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const Article = mongoose.model('Article')

module.exports = (app) => {
  app.use('/user', router)
}

// Login
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('profile')
  } else {
    res.render('login')
  }
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/login'
}))

// Register
router.get('/register', (req, res) => {
  if (req.user) {
    res.redirect('profile')
  } else {
    res.render('register')
  }
})

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/register'
}))

// Profile
router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    // TODO: fetch user data (articles & repos)
    Article.find({ userId: req.user.id }, function(error, articles) {
      if (error) {
        res.render('error', {
          message: error.message,
          error
        })
      }

      res.render('profile', {
        user: req.user,
        articles
      })
    })
  } else {
    res.redirect('/user/login')
  }
})
