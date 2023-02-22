const passport = require("passport");
const passportBearer = require("passport-http-bearer");
const BearerStrategy = passportBearer.Strategy;
const { UserAuth } = require("../models");

passport.use(
  new BearerStrategy(function (token, done) {
    return UserAuth.findOne({
      where: { token: token },
    })
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
