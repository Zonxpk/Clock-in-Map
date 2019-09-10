var db = 'cus1260_test';

module.exports = {
    client: 'mysql',
    connection: {
        host: '192.168.1.102',
        user: 'cus1260_test',
        password: 'ketshoptest',
        database: db,
        charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};

