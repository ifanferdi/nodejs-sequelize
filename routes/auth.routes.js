const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/auth.controller");

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

module.exports = router;
