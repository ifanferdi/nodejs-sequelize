const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");
require("dotenv").config();
const env = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_REDIRECT,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const user = {
        fullname: profile.displayName,
        username: profile.emails[0].value,
        password: null,
      };
      let dataUser = await User.findOne({
        where: { username: user.username },
      }).catch((err) => {
        return cb(err);
      });

      if (!dataUser) {
        dataUser = await User.create(user).catch((err) => {
          return cb(err, null);
        });
      }

      if (dataUser) {
        return cb(null, dataUser);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
