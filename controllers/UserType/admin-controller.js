const bcrypt = require("bcryptjs");
const Admin = require("../../models/UserType/admin-model");

const signinAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = admin.generateToken();
    admin.token = token;
    await admin.save();

    return res.status(200).json({
      message: "Signin successful",
      token,
      admin: {
        _id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    console.log("Admin signin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signinAdmin };