const express = require('express');
const jwt = require('jwt-simple');
const Promise = require('bluebird');
const User = require('../models/user');
const securityConfig = require('../config/security-config');
const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');
const router = express.Router();

router.post('/sign-in', (req, res) => {
    const {username, password} = req.body;
    Promise.coroutine(function* () {
        const user = yield User.where('us_username', username).fetch({withRelated: ['role'],require: false});
        // console.log(user);
        var isValidPassword = false;
        if(user){ 
          const role = user.validRole();
          if(role){
            isValidPassword = yield user.validPassword(password);
          }else{
            res.status(400).send({ message:'You have no permission , Only Admin and Root' });
          }
        }else{
          isValidPassword = false;
        }

        if (isValidPassword) {
            const token = jwt.encode(user.omit('us_password'), securityConfig.jwtSecret);
            res.json({success: true, token: `JWT ${token}`});
        } else {
            res.status(400).send();
            // res.status(400).json({success: false, msg: 'Authentication failed'});
        }
    })().catch(err => console.log(err));
});

router.post('/sign-up', (req, res) => {
  const {role, prefix, firstName, lastName, username, password, confirmPassword, email, phone} = req.body;
  Promise.coroutine(function* () {
    const user = yield User.where('us_username', username).fetch({require: false});
    if( user && username == user.get('us_username')){
      res.status(400).send({ message:'This username is already taken. Please choose another name.' });
    }
    else if(password == confirmPassword){
      const hashed = bcrypt.hashSync( password, securityConfig.saltRounds);
      var gender = 0;
      (prefix == 1)? gender = 1 : gender = 2 ;
        User.forge(
          {
            'us_role_id':role,
            'us_code': uniqid(),
            'us_username':username,
            'us_password':hashed,
            'us_prefix_id':prefix,
            'us_fname':firstName,
            'us_lname':lastName,
            'us_gender_id':gender,
            'us_email':email,
            'us_phone':phone,
            // 'us_since': new Date().toISOString()
            'us_since': new Date()
          }).save()
          .then(result => {
            console.log(result.attributes);
            res.status(200).send({ message:'Register success. Please sign in.' })
          });
    }else{
      res.status(400).send({ message:'Password is not match.' });
    }
  })().catch(err => console.log(err));
});

router.post('/admin-sign-up', (req, res) => {
  const {prefix, firstName, lastName, username, password, confirmPassword, email, phone} = req.body;
  Promise.coroutine(function* () {
    const user = yield User.where('us_username', username).fetch({require: false});
    if( user && username == user.get('us_username')){
      res.status(400).send({ message:'This username is already taken. Please choose another name.' });
    }
    else if(password == confirmPassword){
      const hashed = bcrypt.hashSync( password, securityConfig.saltRounds);
      var gender = 0;
      (prefix == 1)? gender = 1 : gender = 2 ;
        User.forge(
          {
            'us_role_id':1,
            'us_code': uniqid(),
            'us_username':username,
            'us_password':hashed,
            'us_prefix_id':prefix,
            'us_fname':firstName,
            'us_lname':lastName,
            'us_gender_id':gender,
            'us_email':email,
            'us_phone':phone,
            // 'us_since': new Date().toISOString()
            'us_since': new Date()
          }).save()
          .then(result => {
            console.log(result.attributes);
            res.status(200).send({ message:'Register success. Please sign in.' })
          });
    }else{
      res.status(400).send({ message:'Password is not match.' });
    }
  })().catch(err => console.log(err));
});

router.post('/login-user', (req, res) => {
    const {username, password} = req.body;
    Promise.coroutine(function* () {
        const user = yield User.where('us_username', username).fetch({withRelated: ['role'],require: false});
        var isValidPassword = false;
        if(user){ 
          isValidPassword = yield user.validPassword(password);
          if (isValidPassword) {
              user.omit('us_password');
              res.json(user);
          } else {
              res.status(400).send({ message:'Password is not match'});
              // res.status(400).json({success: false, msg: 'Authentication failed'});
          }
        }else{
              res.status(400).send({ message:'Username is not match'});
              // res.status(400).send('false');
        }
    })().catch(err => console.log(err));
});
module.exports = router;