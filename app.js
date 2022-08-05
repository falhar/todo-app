const express = require('express');
const cors = require('cors');

const app = express();
const config = require('./config');
const morgan = require('./tools/morgan');
const ApiError = require('./errors/api-error');
const errorMiddleware = require('./middlewares/error');
const actGR = require('./routes/actGroup.router');
const toDoR = require('./routes/toDo.router');

if (config.app.env !== 'test') {
  app.set('trust proxy', true);
  app.use(morgan.logSuccessRequest);
  app.use(morgan.logErrorRequest);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/activity-groups', actGR);
app.use('/todo-items', toDoR);
app.use((req, res, next) => {
  next(new ApiError(404, 'Not Found', 'Endpoint Not Found!'));
});
app.use(errorMiddleware);

module.exports = app;
