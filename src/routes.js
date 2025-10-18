const express = require("express");
const multer = require("multer");
const { uploadCSV } = require("./controllers/uploadController");
const { listProducts, search } = require("./controllers/productController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/products", listProducts);
router.get("/products/search", search);

module.exports = router;