const express = require('express');
const router = express.Router();

const user = require('./user');

router.use('/user',user);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/test', (req, res) => {
  res.send("test");
});


module.exports = router;