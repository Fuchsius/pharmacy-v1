const {upload, processImage} = require('../middleware/upload')
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

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", upload.single("image"), processImage, createCategory);
router.put("/update/:id", upload.single("image"), processImage, updateCategory);
router.delete("/delete/:id", deleteCategory);
router.delete("/delete/image/:id", deleteCategoryImage);

module.exports = router;


