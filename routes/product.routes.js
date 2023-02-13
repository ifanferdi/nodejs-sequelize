const express = require("express");
const router = express.Router();
const ProductController = require("../app/controllers/product.controller");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProductController.index
);
router.get("/:id", ProductController.index);
router.post("/store", ProductController.store);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.destroy);

module.exports = router;
