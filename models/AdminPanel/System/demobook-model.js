const mongoose = require("mongoose");

const demoBookSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    preferredDate: { type: String, default: "" },
    preferredTime: { type: String, default: "" },
    timezone: { type: String, default: "" },
    notes: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["requested", "scheduled", "In Progress", "On Going", "Hold", "Cancelled", "Completed"],
      default: "requested"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.DemoBook || mongoose.model("DemoBook", demoBookSchema);