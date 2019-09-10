const express = require('express');
const jwt = require('jwt-simple');
const Promise = require('bluebird');
const User = require('../models/user');
const securityConfig = require('../config/security-config');

const router = express.Router();

router.post('/sign-in', (req, res) => {
    const {username, password} = req.body;
    Promise.coroutine(function* () {
        const user = yield User.where('us_username', username).fetch({withRelated: ['role']});
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
            const token = jwt.encode(user.omit('password'), securityConfig.jwtSecret);
            res.json({success: true, token: `JWT ${token}`});
        } else {
            res.status(400).send();
            // res.status(400).json({success: false, msg: 'Authentication failed'});
        }
    })().catch(err => console.log(err));
});

router.post('/sign-up', (req, res) => {
    const {username, password} = req.body;
    User.forge({username, password}).save()
        .then(user => res.json(user.omit('password')));
});

module.exports = router;