require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const sessions = require('express-session');
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

// const handleCallback = () => (req, res) => {
//   res.cookie('jwt', req.user.jwt, { httpOnly: true, secure: COOKIE_SECURE }).redirect(`/`);
// };

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

// app.get(`${ENDPOINT}/auth/status`, passport.authenticate('jwt', { session: false }), (req, res) =>
//   res.json({ email: req.user.email })
// );

module.exports.handler = serverless(app);
