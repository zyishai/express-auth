const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Chance = require('chance')
const chance = new Chance()

module.exports = (app) => {
  app.use('/article', (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect('/user/login')
    }
    next()
  }, router);
};

router.get('/add', (req, res, next) => {
  res.render('newArticle')
})

router.post('/add', (req, res, next) => {
  let { title, content: text } = req.body
  let newArticle = new Article({
    title,
    text,
    url: chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    }),
    userId: req.user.id
  })

  newArticle.save((err, article) => {
    if (err) {
      res.redirect('/article/add')
    }

    res.redirect('/user/profile')
  })
})

router.get('/:url', (req, res, next) => {
  Article.findOne({ url: req.params.url, userId: req.user.id }, function(error, article) {
    if (error) {
      res.render('error', {
        message: 'Error: ' + error.message,
        error
      })
    } else if (!article) {
      res.redirect('/user/profile')
    } else {
      res.render('article', {
        article,
        userId: req.user.id
      })
    }
  })
})

router.get('/:url/edit', (req, res) => {
  Article.findOne({ url: req.params.url, userId: req.user.id }, function(error, article) {
    if (error) {
      res.render('error', {
        message: 'Error: ' + error.message,
        error
      })
    } else if (!article) {
      res.render('error', {
        message: 'You don\'t have permission to update this article!',
        error: {
          status: 'ENOPERM'
        }
      })
    } else {
      res.render('editArticle', {
        article
      })
    }
  })
})

router.post('/:url/update', (req, res) => {
  Article.findOneAndUpdate({ url: req.params.url }, {
    title: req.body.title,
    text: req.body.text
  }, function(err, article) {
    if (err) {
      res.render('error', {
        message: err.message,
        error: err
      })
    } else if (!article) {
      res.render('error', {
        message: 'You don\'t have permissions to update this article!',
        error: {
          status: 'ENOPERM'
        }
      })
    } else {
      res.redirect('/user/profile')
    }
  })
})
