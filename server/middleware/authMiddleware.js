const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "K.3y$3cr3t";

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied, no token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // console.log("Decoded User:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(403).json({ message: "Access denied, invalid token" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied, admin privileges required" });
    }
    next();
  };
  

module.exports = { authenticate, isAdmin };
