const { Strategy: GoogleStrategy } = require('passport-google-oauth2');
const passport = require('passport');

const { BASE_URL, ENDPOINT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./config');

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

        return done(null, { email });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(user ? null : 'null user', user));
passport.deserializeUser((user, done) => done(user ? null : 'null user', user));
