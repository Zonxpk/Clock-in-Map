const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const passport = require("passport");


const auth = require('./auth');
const user = require('./user');
const check_in = require('./check-in');

app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);
app.use('/check_in', check_in);

/* GET api listing. */
app.get('/', (req, res) => {
  res.send('api works');
});

app.get('/test', (req, res) => {
  res.send("test");
});


module.exports = app;