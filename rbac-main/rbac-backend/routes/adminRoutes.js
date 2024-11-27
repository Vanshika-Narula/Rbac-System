// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  searchUsers,
  getSystemStats,
} = require("../controllers/adminController");
const { protect, checkRole } = require("../middleware/authMiddleware");

// Protect all admin routes
router.use(protect);
router.use(checkRole(["admin", "moderator"]));

// Get all users
router.get("/users", getAllUsers);

// Update user role
router.put("/users/:userId/role", updateUserRole);

// Delete user
router.delete("/users/:userId", deleteUser);

// Search users
router.get("/users/search", searchUsers);

// Get system statistics
router.get("/stats", getSystemStats);

module.exports = router;
