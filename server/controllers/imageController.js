const fs = require("fs");
const path = require("path");

// Upload image and return URL
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  try {
    // Construct full URL with protocol and host
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    res.status(201).json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    // Delete the uploaded file if response fails
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({ error: "Failed to upload image" });
  }
};

// Delete image using URL
const deleteImage = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    // Extract filename from imageUrl
    const filename = decodeURIComponent(imageUrl.split("/uploads/").pop());

    if (!filename) {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    const imagePath = path.join(__dirname, "../uploads", filename);

    // Check if file exists and is within uploads directory
    if (
      !fs.existsSync(imagePath) ||
      !imagePath.startsWith(path.join(__dirname, "../uploads"))
    ) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the file
    fs.unlinkSync(imagePath);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
