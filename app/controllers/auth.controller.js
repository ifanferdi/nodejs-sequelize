const { User, UserAuth } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = process.env;
const { detect: browser } = require("detect-browser");

async function login(req, res, next) {
  var username, password;
  if (req.body.username !== undefined && req.body.password !== undefined) {
    username = req.body.username;
    password = req.body.password;
  } else if (
    req.query.username !== undefined &&
    req.query.password !== undefined
  ) {
    username = req.query.username;
    password = req.query.password;
  }

  const findUserByUsername = await User.findOne({
    where: { username: username },
  }).catch((err) => {
    console.log("Error: ".err);
  });

  if (!findUserByUsername) {
    return res.json({ message: "Username doesn't exist." });
  }

  const checkPassword = bcrypt.compareSync(
    password,
    findUserByUsername.password
  );
  if (!checkPassword) {
    return res.json({ message: "Wrong password." });
  }

  const jwtToken = jwt.sign(
    {
      id: findUserByUsername.id,
    },
    env.JWT_SECRET
  );

  await UserAuth.create({
    user_id: findUserByUsername.id,
    token: jwtToken,
    meta: browser(req.headers["user-agent"]),
  });

  res.json({
    message: "Login Success",
    token: jwtToken,
  });
}

async function logout(req, res, next) {
  const { token } = req.body;

  const user = await UserAuth.findOne({ where: { token: token } }).catch(
    (err) => {
      console.log(err);
    }
  );
  if (!user) {
    res.status(201).json({
      message: "Tidak ada sesi data user tersebut.",
    });
  } else {
    UserAuth.destroy({ where: { token: token } }).catch((err) => {
      console.log(err);
    });

    res.status(200).json({
      message: "Logout Sukses",
    });
  }
}

module.exports = {
  login,
  logout,
};
