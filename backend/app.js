const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const authRouter = require('./src/routes/authRouter');
const viewRouter = require('./src/routes/viewRouter');
const db = require('./src/config/db');

const app = express();

db.InitiateMongoServer();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('App Initialized!');
});


app.use(process.env.URL_PREFIX + '/auth', authRouter);
app.use(process.env.URL_PREFIX + '/', viewRouter);

app.listen(2000, () => {
  console.log('Starting app on port 2000');
});
