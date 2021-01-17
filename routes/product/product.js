const express = require("express");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

const { isImage } = require("../../utils");
const auth = require("../../middleware/auth");
const productController = require("../../controllers/product/product");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let path;
    if (isImage(file.mimetype)) {
      path = "./public/uploads/" + req.user._id + "/";
    }

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    callback(null, path);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, " ") + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,

  fileFilter(req, file, cb) {
    if (!isImage(file.mimetype)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true);
  },
});

router.post(
  "/product",
  auth,
  upload.single("imageFile"),
  productController.addProduct
);

router.get("/product", auth, productController.getAllProducts);

module.exports = router;
