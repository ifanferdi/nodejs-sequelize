const express = require("express");
const router = express.Router();
const ProductController = require("../app/controllers/product.controller");

// Method GET
router.get("/", ProductController.index);
router.get("/:id", ProductController.index);

// Method POST
router.post("/", ProductController.index);
router.post("/:id", ProductController.index);

// router
//   .route("/product/:product_id")
//   .all(ProductController.index)
//   .get(ProductController.show);

module.exports = router;
