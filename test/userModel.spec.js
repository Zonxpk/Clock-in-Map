// userModel.spec.js

process.env.NODE_ENV = 'test';

var expect = require('chai').expect;  
var knex = require('knex')(require('../server/config/db_user'));

var User = require('../server/models/user');

describe('User Route', function() {  
// Testing goodness goes here
});