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
        const categories = await prisma.category.findMany(
            {
                include: {
                    products: true,
                },
            }
        );
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
                id: parseInt(id)
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

    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

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

    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    if (!id) {
        if (imagePath) {
            fs.unlinkSync(imagePath);
        }
        return res.status(400).json({ error: "Category ID is required." });
    }
    if (isNaN(id)) {
        if (imagePath) {
            fs.unlinkSync(imagePath);
        }
        return res.status(400).json({ error: "Category ID must be a number." });
    }

    try {

        const category = await prisma.category.findUnique({
            where: {
                id: parseInt(id)
            },
        });

        if (!category) {
            if (imagePath) {
                fs.unlinkSync(imagePath);
            }
            return res.status(404).json({ error: "Category not found." });
        }

        // If the image is updated, delete the old image
        if (category.image && imagePath) {
            if (fs.existsSync(category.image)) {
                fs.unlinkSync(category.image);
            }
        }

        // Update the category
        // If no new image is provided, keep the old image
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                image: imagePath,
            },
            
        });

        res.status(200).json(updatedCategory);

    } catch (error) {
        if (imagePath) {
            fs.unlinkSync(imagePath);
        }
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
            where: { id: parseInt(id) }
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
        
        if(category.image == null){
            return res.status(400).json({ error: "No image to delete." });
        }

        if (category.image && fs.existsSync(category.image)) {
            fs.unlinkSync(category.image);
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

