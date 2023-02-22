const { User, UserAuth } = require("../models");
const { detect: browser } = require("detect-browser");
const tokenGenerate = require("../services/tokenGenerate");
const bcrypt = require("bcrypt");

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
    console.log("Error: " + err);
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

  const token = tokenGenerate();

  await UserAuth.create({
    user_id: findUserByUsername.id,
    token: token,
    meta: {
      location: browser(req.headers["user-agent"]),
      provider: "local",
    },
  });

  res.json({
    message: "Login Success",
    token: token,
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
