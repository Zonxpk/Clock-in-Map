const express = require('express');
const router = express.Router();
const passport = require('passport');
const Promise = require('bluebird');
const User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get('/profile', function(req, res, next) {
    res.send(req.user);
});




module.exports = router;