const mongoose = require("mongoose");

/**
 * Routes use the default Mongoose connection (admin DB), connected at startup.
 */
const roleMiddleware = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database not connected" });
  }
  req.db = mongoose.connection;
  req.userRole = "admin";
  next();
};

module.exports = roleMiddleware;
