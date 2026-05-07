const jwt = require("jsonwebtoken");
const Admin = require("../models/UserType/admin-model");

const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const headerToken = req.headers["x-access-token"] || req.headers.token;
    const queryToken = req.query.token;
    const token = (bearerToken || headerToken || queryToken || "").toString().trim();
    const jwtSecret = process.env.JWT_KEY || process.env.JWT_SECRET;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret is not configured" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    const adminId = decoded.adminId || decoded._id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Optional single-session check: only enforce if token is stored on admin.
    if (admin.token && admin.token.trim() !== token) {
      return res.status(401).json({ message: "Session expired, please sign in again" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authmiddleware };
