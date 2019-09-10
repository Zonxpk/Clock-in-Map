const Bookshelf = require('../config/bookshelf.config');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const User = require('./user');
const Role = Bookshelf.Model.extend({
  tableName: 'ums_role',
  user: function(){
    return this.belongsTo(User);
  }
});

module.exports = Role; 
