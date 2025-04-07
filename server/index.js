const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Authentication Middleware
const { authenticate } = require("./middleware/authMiddleware");

// Routers
const userRouter = require("./routes/userRouter");
const userRouter2 = require("./routes/userRouter2");
const addressRouter = require("./routes/addressRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const productsRouter = require("./routes/productsRouter");
const contactRouter = require("./routes/contactRouter");
const authRouter = require("./routes/authRouter");

// Routes - Middleware
app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/users-v2", authenticate, userRouter2);
app.use("/address", authenticate, addressRouter);
app.use("/categories", authenticate, categoriesRouter);
app.use("/products", authenticate, productsRouter);
app.use("/contact", authenticate, contactRouter);

// Example health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
