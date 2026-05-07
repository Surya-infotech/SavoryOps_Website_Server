const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    adminfirstname: { type: String, required: true, trim: true },
    adminlastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    profileimage: { type: String, default: "" },
    token: { type: String, default: "" }
  },
  { timestamps: true }
);

adminSchema.methods.generateToken = function generateToken() {
  return jwt.sign(
    { adminId: this._id.toString(), role: "admin" },
    process.env.JWT_KEY,
    { expiresIn: "1d" }
  );
};

module.exports =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
