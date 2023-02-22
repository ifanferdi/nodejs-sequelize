const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const product = require("./routes/product.routes");
const auth = require("./routes/auth.routes");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./app/services/login-auth");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
require("dotenv").config({ path: "./.env" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hallo World");
});

// Middleware
require("./app/middlewares/passport.middleware");

app.use("/public", express.static("public"));

app.use("/auth", auth);
app.use("/product", product);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
