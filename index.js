const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const product = require("./routes/product.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hallo World");
});

app.use("/product", product);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
