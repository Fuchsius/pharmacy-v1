const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        fullName: true,
        email: true,
        status: true,
        roleRelation: {
          select: { role: true },
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Server error fetching users" });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
      return res.status(400).json({ error: "Role ID is required" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role: parseInt(roleId) },
      include: { roleRelation: true },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Update user role error:", error);
    res.status(500).json({ error: "Server error updating user role" });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        fullName: true,
        email: true,
        username: true,
        phone: true,
        profilePic: true,
        roleRelation: {
          select: { role: true },
        },
        address: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Server error fetching profile" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, username } = req.body;

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (firstName && lastName) updateData.fullName = `${firstName} ${lastName}`;
    if (phone) updateData.phone = phone;
    if (username) updateData.username = username;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      include: { roleRelation: true },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Server error updating profile" });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  getUserProfile,
  updateUserProfile,
};
