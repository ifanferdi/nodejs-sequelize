const crypto = require("crypto");

function tokenGenerate() {
  let token = crypto.randomBytes(20).toString("hex");
  token = Date.now() + token;
  return token;
}

module.exports = tokenGenerate;
