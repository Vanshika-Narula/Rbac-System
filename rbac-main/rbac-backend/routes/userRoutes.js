// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUsersByRole,
} = require("../controllers/userController");
const { protect, checkRole } = require("../middleware/authMiddleware");

// Get all users (Admin only)
router.get("/", protect, checkRole(["admin"]), getAllUsers);

// Get users by role (Admin only)
router.get("/role/:role", protect, checkRole(["admin"]), getUsersByRole);

// Get user profile (Authenticated users)
router.get("/profile", protect, getUserProfile);

// Update user profile (Authenticated users)
router.put("/profile", protect, updateUserProfile);

// Get user by ID (Admin only)
router.get("/:id", protect, checkRole(["admin"]), getUserById);

// Update user (Admin only)
router.put("/:id", protect, checkRole(["admin"]), updateUser);

// Delete user (Admin only)
router.delete("/:id", protect, checkRole(["admin"]), deleteUser);

module.exports = router;
