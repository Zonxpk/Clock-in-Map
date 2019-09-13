const Bookshelf = require('../config/bookshelf.config');
const Promise = require('bluebird');
Bookshelf.plugin('registry')
const User = require('./user');
const Location = require('./location');
const CheckIn = Bookshelf.Model.extend({
  tableName: 'pl_check_in',
  idAttribute : 'ci_id',
  location: function(){
    return this.hasOne('Location','lc_ci_id','ci_id');
  },
  user: function(){
    return this.belongsTo('User','us_id','ci_us_id');
  }
});

module.exports = Bookshelf.model('CheckIn',CheckIn); 
