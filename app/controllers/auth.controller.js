const { User, UserAuth } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = process.env;

async function login(req, res) {
  const { username, password } = req.body;

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
      username: findUserByUsername.username,
    },
    env.JWT_SECRET
  );

  await UserAuth.create({
    user_id: findUserByUsername.id,
    token: jwtToken,
  });
  console.log(req);

  res.json({
    message: "Login Success",
    token: jwtToken,
  });
}

module.exports = {
  login,
};
