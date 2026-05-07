const DemoBook = require("../../../models/AdminPanel/System/demobook-model");

const createDemoBook = async (req, res) => {
  try {
    const demo = await DemoBook.create(req.body);
    return res.status(201).json({ message: "Demo request created", demo });
  } catch (error) {
    console.log("Create demo request error:", error);
    return res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

const getAllDemoBooks = async (req, res) => {
  try {
    const demos = await DemoBook.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "Demo requests fetched", demos });
  } catch (error) {
    console.log("Get demo requests error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createDemoBook, getAllDemoBooks };
