const express = require("express");
const router = express.Router();
const { upload, processImage } = require("../middleware/upload");
const { uploadImage, deleteImage } = require("../controllers/imageController");
const { authenticate, authorize } = require("../middleware/authMiddleware2");

// Image routes
router.post(
  "/upload",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  processImage,
  uploadImage
);
router.delete("/delete", authenticate, authorize("admin"), deleteImage);

module.exports = router;
