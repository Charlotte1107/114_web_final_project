const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const verifyToken = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");

// ===== Read（所有人都可以）=====
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ===== Create / Update / Delete（只有 admin）=====
router.post("/", verifyToken, requireAdmin, createProduct);
router.put("/:id", verifyToken, requireAdmin, updateProduct);
router.delete("/:id", verifyToken, requireAdmin, deleteProduct);

module.exports = router;
