const app = require('./app');
const config = require('./config');
const { sequelize } = require('./models');
const logger = require('./tools/logger');

const port = config.app.port || 3000;

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error);
  });

app.listen(port, () => {
  logger.info(`program running on port ${port}`);
});
