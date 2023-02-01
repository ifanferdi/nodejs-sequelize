const express = require("express");
const router = express.Router();
const ProductController = require("../app/controllers/product.controller");

router.get("/", ProductController.index);
router.get("/:id", ProductController.index);
router.post("/store", ProductController.store);
router.put("/:id", ProductController.update);

module.exports = router;
