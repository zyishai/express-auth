const express = require('express');
const router = express.Router();

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/user/profile')
  } else {
    res.render('index')
  }
});

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
