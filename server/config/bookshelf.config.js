
// var advancedSerialization = require('bookshelf-advanced-serialization');
var knex = require('knex')(require('./db_config'));

var Bookshelf = require('bookshelf')(knex);
// Bookshelf.plugin(advancedSerialization());
Bookshelf.plugin('registry');
// Bookshelf.plugin('pagination');

module.exports = Bookshelf;  