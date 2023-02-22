const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/auth.controller");
const passport = require("passport");
require("../app/services/google-auth");

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
        successRedirect: "/product",
    })
);

module.exports = router;
