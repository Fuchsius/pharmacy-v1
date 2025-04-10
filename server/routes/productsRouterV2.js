const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById, // Add import
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsControllerV2");
const { authenticate, authorize } = require("../middleware/authMiddleware2");

// Product routes v2 with auth
router.get("/", getAllProducts);
router.get("/:id", getProductById); // Add new route
router.post("/", authenticate, authorize("admin"), createProduct);
router.put("/:id", authenticate, authorize("admin"), updateProduct);
router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

module.exports = router;
