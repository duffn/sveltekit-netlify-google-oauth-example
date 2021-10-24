// const { sign } = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth2');
const passport = require('passport');
// const passportJwt = require('passport-jwt');

const {
  BASE_URL,
  ENDPOINT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
  //SECRET
} = require('./config');

// function authJwt(email) {
//   return sign({ user: { email } }, SECRET);
// }

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}${ENDPOINT}/auth/google/callback`,
      passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const email = profile.emails[0].value;
        // const jwt = authJwt(email);

        return done(null, { email });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// passport.use(
//   new passportJwt.Strategy(
//     {
//       jwtFromRequest(req) {
//         if (!req.cookies) throw new Error('Missing cookie-parser middleware');
//         return req.cookies.jwt;
//       },
//       secretOrKey: SECRET
//     },
//     async ({ user: { email } }, done) => {
//       try {
//         const jwt = authJwt(email);

//         return done(null, { email, jwt });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

passport.serializeUser((user, done) => done(user ? null : 'null user', user));
passport.deserializeUser((user, done) => done(user ? null : 'null user', user));
