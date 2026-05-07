const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    token: { type: String, default: "" }
  },
  { timestamps: true }
);

adminSchema.methods.generateToken = function generateToken() {
  const jwtSecret = process.env.JWT_KEY;
  if (!jwtSecret) {
    throw new Error("Missing JWT_KEY (or JWT_SECRET) in environment variables");
  }

  return jwt.sign(
    { adminId: this._id.toString(), role: "admin" },
    jwtSecret,
    { expiresIn: "1d" }
  );
};

module.exports =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);