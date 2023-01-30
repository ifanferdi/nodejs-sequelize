const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");

router.get("/", ProductController.index);

// router
//   .route("/product/:product_id")
//   .all(ProductController.index)
//   .get(ProductController.show);

module.exports = router;
