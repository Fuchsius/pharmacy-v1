const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all products with essential fields
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        brand: true,
        categoryId: true,
        stockCount: true,
        price: true,
        discount: true,
        description: true,
        productImages: {
          select: {
            imageUrl: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      imageUrl: product.productImages?.[0]?.imageUrl || null,
      productImages: undefined,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get product by ID with essential fields
const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Valid product ID is required" });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        brand: true,
        categoryId: true,
        stockCount: true,
        price: true,
        discount: true,
        description: true,
        productImages: {
          select: {
            imageUrl: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      ...product,
      imageUrl: product.productImages?.[0]?.imageUrl || null,
      productImages: undefined,
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Create product with imageUrl
const createProduct = async (req, res) => {
  const {
    name,
    brand,
    categoryId,
    stockCount,
    price,
    discount,
    description,
    imageUrl,
  } = req.body;

  if (!name || !brand || !categoryId || !stockCount || !price || !description) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        brand,
        categoryId: parseInt(categoryId),
        stockCount: parseInt(stockCount),
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : null,
        description,
        productImages: {
          create: imageUrl ? [{ imageUrl }] : [],
        },
      },
      include: {
        productImages: true,
      },
    });

    res.status(201).json({
      ...product,
      imageUrl: product.productImages[0]?.imageUrl || null,
      productImages: undefined,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    brand,
    categoryId,
    stockCount,
    price,
    discount,
    description,
    imageUrl,
  } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Valid product ID is required" });
  }

  try {
    // Update product
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        brand,
        categoryId: parseInt(categoryId),
        stockCount: parseInt(stockCount),
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : null,
        description,
        productImages: {
          deleteMany: {},
          create: imageUrl ? [{ imageUrl }] : [],
        },
      },
      include: {
        productImages: true,
      },
    });

    res.status(200).json({
      ...product,
      imageUrl: product.productImages[0]?.imageUrl || null,
      productImages: undefined,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Valid product ID is required" });
  }

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Delete product error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById, // Add to exports
  createProduct,
  updateProduct,
  deleteProduct,
};
