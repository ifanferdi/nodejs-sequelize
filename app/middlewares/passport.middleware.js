const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const env = process.env;
const { UserAuth } = require("../models");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
      passReqToCallback: true,
    },
    function (req, jwtPayload, done) {
      var token = req.rawHeaders[1];
      token = token.replace("Bearer ", "");
      return UserAuth.findOne({
        where: { user_id: jwtPayload.id, token: token },
      })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
