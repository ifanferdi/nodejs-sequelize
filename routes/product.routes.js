const express = require("express");
const router = express.Router();
const ProductController = require("../app/controllers/product.controller");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.STORAGE_PRODUCT_UPLOAD, cb);
  },
  filename: function (req, file, cb) {
    const file_name = crypto.randomBytes(20).toString("hex"); //Random string for file name
    const file_extension = path.extname(file.originalname);
    cb(null, file_name + file_extension, cb);
  },
});
const upload = multer({ storage: storage }).single("image");

router.get(
  "/",
  passport.authenticate("bearer", { session: false }),
  ProductController.index
);
router.get(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  ProductController.index
);
router.post(
  "/store",
  passport.authenticate("bearer", { session: false }),
  upload,
  ProductController.store
);
router.put(
  "/:id",
  upload,
  passport.authenticate("bearer", { session: false }),
  ProductController.update
);
router.delete(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  ProductController.destroy
);

module.exports = router;
