const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const fs = require("fs");
const path = require("path");
const { parseArgs } = require("util");

dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "K.3y$3cr3t";

// Product Controller - CRUD Operations ----------------------------------------

// Get all products

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        productImages: true,
        reviews: true,
        ProductTags: true,
        category: true,
      },
    });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required." });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Product ID must be a number." });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product." });
  }
};
// model Product {
//     id            Int            @id @default(autoincrement())
//     name          String
//     description   String
//     price         Float
//     stockCount    Int
//     sku           String?         @unique
//     categoryId    Int
//     brand         String?
//     videoUrl      String?
//     weight        Float?
//     discount      Float?
//     salePrice     Float?
//     createdAt     DateTime       @default(now())
//     productImages ProductImage[]
//     reviews       Reviews[]
//     orderItems    OrderItem[]
//     cartItems     CartItem[]
//     ProductTags   ProductTags[]
//     category      Category       @relation(fields: [categoryId], references: [id])
//   }

// Create a new product
const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    stockCount,
    sku,
    categoryId,
    brand,
    videoUrl,
    weight,
    discount,
    salePrice,
  } = req.body;

  // Validate required fields
  if (!name || !description || !price || !stockCount || !categoryId) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Validate numeric fields
  if (isNaN(price) || isNaN(stockCount) || isNaN(categoryId)) {
    return res
      .status(400)
      .json({ error: "Price, stock count, and category ID must be numbers." });
  }

  // Optional numeric validations
  if (weight && isNaN(weight)) {
    return res.status(400).json({ error: "Weight must be a number." });
  }
  if (discount && isNaN(discount)) {
    return res.status(400).json({ error: "Discount must be a number." });
  }
  if (salePrice && isNaN(salePrice)) {
    return res.status(400).json({ error: "Sale price must be a number." });
  }
  if (categoryId && typeof categoryId !== "number") {
    return res.status(400).json({ error: "Category ID must be a number." });
  }

  try {
    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(categoryId),
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    // Create the product with optional SKU
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stockCount,
        sku: sku || null, // Make SKU optional
        categoryId,
        brand,
        videoUrl,
        weight,
        discount,
        salePrice,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product." });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    stockCount,
    sku,
    categoryId,
    brand,
    videoUrl,
    weight,
    discount,
    salePrice,
  } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required." });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Product ID must be a number." });
  }
  if (weight && isNaN(weight)) {
    return res.status(400).json({ error: "Weight must be a number." });
  }
  if (discount && isNaN(discount)) {
    return res.status(400).json({ error: "Discount must be a number." });
  }
  if (salePrice && isNaN(salePrice)) {
    return res.status(400).json({ error: "Sale price must be a number." });
  }
  if (weight && typeof weight !== "number") {
    return res.status(400).json({ error: "Weight must be a number." });
  }
  if (discount && typeof discount !== "number") {
    return res.status(400).json({ error: "Discount must be a number." });
  }
  if (salePrice && typeof salePrice !== "number") {
    return res.status(400).json({ error: "Sale price must be a number." });
  }
  if (stockCount && typeof stockCount !== "number") {
    return res.status(400).json({ error: "Stock count must be a number." });
  }
  if (categoryId && typeof categoryId !== "number") {
    return res.status(400).json({ error: "Category ID must be a number." });
  }

  try {
    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        stockCount,
        sku,
        categoryId,
        brand,
        videoUrl,
        weight,
        discount,
        salePrice,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product." });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required." });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Product ID must be a number." });
  }

  try {
    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
      include: {
        productImages: true,
        reviews: true,
        ProductTags: true,
      },
    });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product." });
  }
};

// search products
const searchProducts = async (req, res) => {
  const rawQuery = req.query.query || "";
  const rawCategory = req.query.category || "";
  const rawMinPrice = req.query.minprice || "";
  const rawMaxPrice = req.query.maxprice || "";

  const query = rawQuery.toLowerCase();
  const category = rawCategory.toLowerCase();
  const minPrice = parseFloat(rawMinPrice) || 0;
  const maxPrice = parseFloat(rawMaxPrice) || Infinity;

  try {
    // Fetch products with related category and images
    const products = await prisma.product.findMany({
      include: {
        productImages: true,
        category: true,
      },
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });

    // Filter manually for text query and category
    const filtered = products.filter((product) => {
      const matchesText =
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query);

      const matchesCategory =
        category === "" ||
        product.category?.name?.toLowerCase().includes(category);

      return matchesText && matchesCategory;
    });

    res.status(200).json(filtered);
  } catch (error) {
    console.error("Search error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for products." });
  }
};

//   model ProductImage {
//     id        Int     @id @default(autoincrement())
//     productId Int
//     imageUrl  String
//     product   Product @relation(fields: [productId], references: [id])
//   }

// add product image

const addProductImage = async (req, res) => {
  const productId = req.params.id;

  const imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    : null;
  // const imageUrl = req.file.path ;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required." });
  }
  if (isNaN(productId)) {
    return res.status(400).json({ error: "Product ID must be a number." });
  }

  try {
    const productImage = await prisma.productImage.create({
      data: {
        productId: parseInt(productId),
        imageUrl,
      },
    });
    res.status(201).json(productImage);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product image." });
  }
};

// Delete product image
const deleteProductImage = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Product image ID is required." });
  }
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Product image ID must be a number." });
  }

  try {
    const productImage = await prisma.productImage.findUnique({
      where: { id: parseInt(id) },
    });

    if (!productImage) {
      return res.status(404).json({ error: "Product image not found." });
    }

    // Delete the image file from the server
    const imagePath = productImage.imageUrl;

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await prisma.productImage.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Product image deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product image." });
  }
};

// model Reviews {
//     id        Int      @id @default(autoincrement())
//     productId Int
//     userId    Int
//     rating    Float
//     comment   String?
//     createdAt DateTime @default(now())
//     product   Product  @relation(fields: [productId], references: [id])
//     user      User     @relation(fields: [userId], references: [id])
//   }

// Reviews Controller - CRUD Operations ----------------------------------------

// get review by id

// create review

const createReview = async (req, res) => {
  const { productId, userId, rating, comment } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required." });
  }
  if (isNaN(productId)) {
    return res.status(400).json({ error: "Product ID must be a number." });
  }
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }
  if (isNaN(userId)) {
    return res.status(400).json({ error: "User ID must be a number." });
  }
  if (isNaN(rating)) {
    return res.status(400).json({ error: "Rating must be a number." });
  }

  try {
    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Check if the review already exists
    const existingReview = await prisma.reviews.findFirst({
      where: {
        productId: parseInt(productId),
        userId: parseInt(userId),
      },
    });
    if (existingReview) {
      return res.status(400).json({ error: "Review already exists." });
    }

    // Create the review
    const review = await prisma.reviews.create({
      data: {
        productId: parseInt(productId),
        userId: parseInt(userId),
        rating,
        comment,
      },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review." });
  }
};

// update review

const updateReview = async (req, res) => {
  const id = req.params.id;
  const { rating, comment } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Review ID is required." });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Review ID must be a number." });
  }
  if (isNaN(rating)) {
    return res.status(400).json({ error: "Rating must be a number." });
  }

  try {
    const review = await prisma.reviews.update({
      where: { id: parseInt(id) },
      data: {
        rating,
        comment,
      },
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to update review." });
  }
};

// delete review

const deleteReview = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Review ID is required." });
  }
  if (isNaN(id)) {
    return res.status(400).json({ error: "Review ID must be a number." });
  }

  try {
    // Check if the review exists
    const review = await prisma.reviews.findUnique({
      where: { id: parseInt(id) },
    });
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    await prisma.reviews.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review." });
  }
};

// Export all functions
module.exports = {
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
};
