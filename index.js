const express = require("express");
const app = express();
const PORT = 3000;
const Sequelize = require("sequelize");

const sequelize = new Sequelize("rnd_nodejs", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
