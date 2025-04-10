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
// const { authenticate } = require("./middleware/authMiddleware");

// Routers
const userRouter = require("./routes/userRouter");
const userRouter2 = require("./routes/userRouter2");
const addressRouter = require("./routes/addressRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const productsRouter = require("./routes/productsRouter");
const contactRouter = require("./routes/contactRouter");
const authRouter = require("./routes/authRouter");
const imageRouter = require("./routes/imageRouter");
const productsRouterV2 = require("./routes/productsRouterV2");

// Routes - Middleware
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/users-v2", userRouter2);
app.use("/address", addressRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/contact", contactRouter);
app.use("/images", imageRouter);
app.use("/products-v2", productsRouterV2);

// Example health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
