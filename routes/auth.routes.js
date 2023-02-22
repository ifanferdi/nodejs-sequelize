const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/auth.controller");
const passport = require("passport");
require("../app/services/google-auth");
const tokenGenerate = require("../app/services/tokenGenerate");
const { UserAuth } = require("../app/models");
const { detect: browser } = require("detect-browser");

router.post("/login", AuthController.login);
router.get("/login", AuthController.login);
router.post("/logout", AuthController.logout);

router.get("/login-google", async function (req, res) {
  res.send(`<a href="/auth/google">Google Login</a>`);
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google",
  }),
  async (req, res) => {
    const token = tokenGenerate();

    await UserAuth.create({
      user_id: req.user.dataValues.id,
      token: token,
      meta: {
        location: browser(req.headers["user-agent"]),
        provider: "google",
      },
    });

    res.json({
      message: "Login Success",
      token: token,
    });
  }
);

module.exports = router;
