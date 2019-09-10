const express = require('express');
const passport = require('passport');
const router = express.Router();
const CheckIn = require('../models/check-in')
const Promise = require('bluebird');
const User = require('../models/user')
const Users = require('../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('check in work');
});

/* GET user profile. */
router.post('/log-by-person', function(req, res, next) {
  const {us_id} = req.body;
  Promise.coroutine(function* () {
    const check_in = yield CheckIn.where('ci_us_id',us_id).fetch();
      if(check_in){
        res.json(check_in);
      }else{
        res.status(400).send({message:'User not found.'});
      }
  })().catch(err => console.log(err));
});

router.get('/sale-list', function(req, res, next) {
  Promise.coroutine(function* () {
    const sale = yield User.query((qb)=>{
      qb.leftJoin('ums_role','ums_role.ro_id','=','us_role_id');
      qb.leftJoin('ums_prefix','ums_prefix.pf_id','=','us_prefix_id');
      qb.leftJoin('ums_gender','ums_gender.gd_id','=','us_gender_id');
      qb.select(
        'us_id as id',
        'ro_name as role',
        'us_code as code',
        'pf_name as prefix',
        'us_fname as fname',
        'us_lname as lname',
        'gd_name as gender'
      )
      qb.where('ro_name','=','sale');
    }).fetchAll();
    // const sale = yield User.fetchAll();
      if(sale){
        res.json(sale);
      }else{
        res.status(400).send({message:'Sale not found.'});
      }
  })().catch(err => console.log(err));
});

module.exports = router;