const Bookshelf = require('../config/bookshelf.config');
const Promise = require('bluebird');
const bcrypt = require('bcryptjs');
const Role = require('./role');
const CheckIn = require('./check-in');
const securityConfig = require('../config/security-config');
const Users = Bookshelf.Collection.extend({
  model: 'ums_user',
});
const User = Bookshelf.Model.extend({
  tableName: 'ums_user',
  role: function(){
    return this.hasOne(Role,'ro_id','us_role_id');
  },
  check_in: function(){
    return this.hasMany('CheckIn','ci_us_id','us_id');
  },
  validPassword: function(password) {
    return bcrypt.compare(password, this.attributes.us_password);
  },
  validRole: function() {
    const role = this.relations.role.attributes;
    if(role.ro_name == 'admin' || role.ro_name == 'root'){
      return role.ro_name;
    }else{
      return false;
    }
  },
  initialize() {
      this.on('saving', model => {
          if (!model.hasChanged('password')) return;

          return Promise.coroutine(function* () {
              const salt = yield bcrypt.genSalt(securityConfig.saltRounds);
              const hashedPassword = yield bcrypt.hash(model.attributes.us_password, salt);
              model.set('password', hashedPassword);
          })();
      });
  }
});

module.exports = Bookshelf.model('User',User);
