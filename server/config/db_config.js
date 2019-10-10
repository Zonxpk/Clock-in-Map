var db = 'cus1260_test';

module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'admin',
        password: 'ketshopweb21',
        database: db,
        charset: 'utf8',
        port: 3306,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};

