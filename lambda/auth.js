require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const sessions = require('client-sessions');
const passport = require('passport');
const serverless = require('serverless-http');
const helmet = require('helmet');

require('./utils/auth');

const { COOKIE_SECURE, ENDPOINT } = require('./utils/config');

const app = express();

app.use(helmet());
app.use(
  sessions({
    cookieName: 'session',
    secret: process.env.SESSION_SECRET,
    cookie: {
      ephemeral: false,
      secure: COOKIE_SECURE,
      httpOnly: true
    }
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get(
  `${ENDPOINT}/auth/google`,
  passport.authenticate('google', {
    session: false,
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);

app.get(
  `${ENDPOINT}/auth/google/callback`,
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' })
);

module.exports.handler = serverless(app);
