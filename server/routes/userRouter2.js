const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController2"); // Changed from userController to userController2
const { authenticate, authorize } = require("../middleware/authMiddleware2");

// Admin routes
router.get("/", authenticate, authorize("admin"), getAllUsers);
router.put("/:id/role", authenticate, authorize("admin"), updateUserRole);

// User profile routes (for both admin and customer)
router.get(
  "/profile",
  authenticate,
  authorize("customer", "admin"),
  getUserProfile
);
router.put("/profile", authenticate, updateUserProfile);

module.exports = router;
