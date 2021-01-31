const express = require('express');
const fs = require('fs');
const https = require('https');
const session = require('express-session');
const cors = require('cors');

const key = fs.readFileSync(__dirname + '/../key.pem', 'utf-8');
const cert = fs.readFileSync(__dirname + '/../cert.pem', 'utf-8');

const app = express();

app.use(
  session({
    secret: '!@#BoardDev#@!',
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 864000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'https://localhost:3000',
    methods: ['GET', 'POST', 'UPDATE', 'OPTIONS'],
    credentials: true,
  })
);

const userRouter = require('./router/user');
const boardRouter = require('./router/board');

app.use('/user', userRouter);
app.use('/board', boardRouter);

const httpsServer = https.createServer({ key, cert }, app).listen(4000, () => {
  console.log('server on 4000 port');
});

module.exports = httpsServer;
