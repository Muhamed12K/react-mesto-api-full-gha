require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');

const auth = require('./middlewares/auth');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

const corseAllowedOrigins = [
  'http://micky.nomoredomainsrocks.ru',
  'https://micky.nomoredomainsrocks.ru',
  'localhost:3000',
];

app.use(cors({
  origin: corseAllowedOrigins,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept ');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger);

app.use(limiter);

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
