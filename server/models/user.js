var Bookshelf = require('../config/bookshelf.config');

var User = Bookshelf.Model.extend({

  tableName: 'ums_user'

});

module.exports = User;  