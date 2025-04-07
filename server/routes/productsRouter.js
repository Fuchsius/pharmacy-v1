const express = require("express");
const {upload, processImage} = require("../middleware/upload");

const router = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    addProductImage,
    deleteProductImage,
    createReview,
    updateReview,
    deleteReview,
} = require("../controllers/productsController");


// Product routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.post("/search", searchProducts);

router.post("/image/:id", upload.single("image"), processImage, addProductImage);
router.delete("/image/:id", deleteProductImage);

router.post("/review/:id", createReview);
router.put("/review/:id", updateReview);
router.delete("/review/:id", deleteReview);

module.exports = router;