require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const serverless = require('serverless-http');
const helmet = require('helmet');

const { COOKIE_SECURE, ENDPOINT } = require('./utils/config');

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const handleCallback = () => (req, res) => {
  res.cookie('jwt', req.user.jwt, { httpOnly: true, secure: COOKIE_SECURE }).redirect(`/`);
};

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
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  handleCallback()
);

app.get(`${ENDPOINT}/auth/status`, passport.authenticate('jwt', { session: false }), (req, res) =>
  res.json({ email: req.user.email })
);

module.exports.handler = serverless(app);
