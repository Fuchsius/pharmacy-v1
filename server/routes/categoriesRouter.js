const { upload, processImage } = require("../middleware/upload");
const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategoryImage,
} = require("../controllers/categoryController");
const { authorize, authenticate } = require("../middleware/authMiddleware2");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  processImage,
  createCategory
);
router.put(
  "/update/:id",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  processImage,
  updateCategory
);
router.delete("/delete/:id", authenticate, authorize("admin"), deleteCategory);
router.delete(
  "/delete/image/:id",
  authenticate,
  authorize("admin"),
  deleteCategoryImage
);

module.exports = router;
