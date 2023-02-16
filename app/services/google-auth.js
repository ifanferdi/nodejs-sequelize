const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");
const { json, response } = require("express");
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
      console.log(profile);
      const user = {
        fullname: profile.displayName,
        username: profile.emails[0],
        password: null,
      };
      var dataUser = User.findOne({
        where: { username: user.username },
      }).catch((err) => {
        console.log(err);
      });

      if (!dataUser) {
        dataUser = User.create(user).catch((err) => {
          console.log(err);
          cb(err, null);
        });
      }

      if (dataUser) return cb(null, dataUser);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user: ", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const dataUser = User.findOne({
    where: { username: user.username },
  }).catch((err) => {
    console.log("Error deserializing: ", err);
    cb(err, null);
  });
  if (dataUser) cb(null, user);
});
