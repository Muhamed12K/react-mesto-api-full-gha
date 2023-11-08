require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');

const errorHandler = require('./middlewares/errorHandler');

const { MONGODB_URL } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());
app.use(helmet());

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);

// const corseAllowedOrigins = [
//   'http://micky.nomoredomainsrocks.ru',
//   'https://micky.nomoredomainsrocks.ru',
//   'localhost:3000',
// ];
//
// app.use(cors({
//   origin: corseAllowedOrigins,
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));
//
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept ');
//
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });