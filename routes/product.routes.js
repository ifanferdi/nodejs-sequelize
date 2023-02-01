const express = require("express");
const router = express.Router();
const ProductController = require("../app/controllers/product.controller");

// Method GET
router.get("/", ProductController.index);
router.get("/:id", ProductController.index);

// Method POST
router.post("/store", ProductController.store);

module.exports = router;
