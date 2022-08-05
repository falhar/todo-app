module.exports = {
  default: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.DB_DRIVER,
    logging: process.env.SQL_LOG === 'true' || false,

    // only used when dialect is sqlite
    storage: process.env.DB_DATABASE,

    // storage to save information of seeder has been run
    seederStorage: 'sequelize',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
};
