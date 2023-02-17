const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const product = require("./routes/product.routes");
const auth = require("./routes/auth.routes");
require("dotenv").config({ path: "./.env" });
require("./app/middlewares/passport.middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hallo World");
});

// Middleware
require("./app/middlewares/passport.middleware");

app.use("/auth", auth);
app.use("/product", product);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
