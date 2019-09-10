var knex = require('knex')(require('./db_config'));

var Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');

module.exports = Bookshelf;  