const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const fs = require("fs");
const path = require("path");

dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "K.3y$3cr3t";

// Category Controller - CRUD Operations ----------------------------------------

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories." });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Category ID is required." });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Category ID must be a number." });
  }

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        products: true,
      },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category." });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  const imagePath = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
        image: imagePath,
      },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category." });
  }
};

// Update category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Only set new image path if file is uploaded
  const imagePath = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;

  if (!id) {
    return res.status(400).json({ error: "Category ID is required." });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Category ID must be a number." });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Only handle image changes if a new image is uploaded
    if (imagePath && category.image) {
      const oldImageFilename = category.image.split("/uploads/").pop();
      const oldImagePath = path.join("uploads", oldImageFilename);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update category with new data, keeping old image if no new one provided
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        ...(imagePath ? { image: imagePath } : {}), // Only update image if new one provided
      },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category." });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Category ID is required." });
  }

  if (isNaN(id)) {
    return res.status(400).json({ error: "Category ID must be a number." });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Delete the category image if it exists
    if (category.image && fs.existsSync(category.image)) {
      fs.unlinkSync(category.image);
    }

    // Delete the category
    await prisma.category.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ error: "Failed to delete category." });
  }
};

// Delete category image
const deleteCategoryImage = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Category ID is required." });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Category ID must be a number." });
  }
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    if (!category.image) {
      return res.status(400).json({ error: "No image to delete." });
    }

    // Extract filename from URL and construct filesystem path
    const filename = category.image.split("/uploads/").pop();
    const imagePath = path.join("uploads", filename);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { image: null },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error deleting category image:", error);
    res.status(500).json({ error: "Failed to delete category image." });
  }
};

// Exporting the functions
module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategoryImage,
};
