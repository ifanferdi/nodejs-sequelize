const express = require("express");
const router = express.Router();
const ProductController = require("../app/controllers/product.controller");
const passport = require("passport");
const multer = require("multer");
const forms = multer({ dist: "public/assets/product/" });

router.use(forms.any());
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProductController.index
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProductController.index
);
router.post(
  "/store",
  passport.authenticate("jwt", { session: false }),
  ProductController.store
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProductController.update
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProductController.destroy
);

module.exports = router;
