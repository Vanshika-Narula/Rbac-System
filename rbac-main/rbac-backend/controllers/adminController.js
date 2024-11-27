const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate role
    const validRoles = ["user", "moderator", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Prevent last admin from being demoted
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount < 1) {
      return res.status(400).json({
        message: "Cannot remove last admin",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error updating user role",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent deleting last admin
    const adminCount = await User.countDocuments({ role: "admin" });
    const userToDelete = await User.findById(userId);

    if (adminCount <= 1 && userToDelete.role === "admin") {
      return res.status(400).json({
        message: "Cannot delete last admin",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: term, $options: "i" } },
        { email: { $regex: term, $options: "i" } },
      ],
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error searching users",
      error: error.message,
    });
  }
};

exports.getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: "admin" });
    const moderatorUsers = await User.countDocuments({ role: "moderator" });
    const activeUsers = await User.countDocuments({ isActive: true });

    res.json({
      totalUsers,
      adminUsers,
      moderatorUsers,
      activeUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching system stats",
      error: error.message,
    });
  }
};
