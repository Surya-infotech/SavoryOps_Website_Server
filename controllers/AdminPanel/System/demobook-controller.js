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
    if (!demos.length) {
      return res.status(200).json({ message: "No demo request found", demos: [] });
    }
    return res.status(200).json({ message: "Demo requests fetched", demos });
  } catch (error) {
    console.log("Get demo requests error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateDemoBookStatus = async (req, res) => {
  try {
    const { demoId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedDemo = await DemoBook.findByIdAndUpdate(
      { _id: demoId },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedDemo) {
      return res.status(404).json({ message: "Demo request not found" });
    }

    return res.status(200).json({
      message: "Demo request status updated",
      demo: updatedDemo
    });
  } catch (error) {
    console.log("Update demo request status error:", error);
    return res.status(400).json({ message: "Invalid request", error: error.message });
  }
};

module.exports = { createDemoBook, getAllDemoBooks, updateDemoBookStatus };
