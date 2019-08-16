const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('user works');
});

router.get('/test', (req, res) => {
  res.send("test");
});

router.get('/get_all_user',async (req, res) => {
  let temp = await new User().query((qb)=> {
    qb.where('us_username','is not',null)
  }).fetchAll()
  console.log(temp.toJSON());
  res.json(temp)
});


// router.get('/get_all_user', (req, res) => {
//   new User().fetchAll()
//   .then(function (users){
//     res.send(users.toJSON());
//   }).catch(function(error) {
//     console.log(error);
//     res.send('An error occured');
//   });
// });


module.exports = router;