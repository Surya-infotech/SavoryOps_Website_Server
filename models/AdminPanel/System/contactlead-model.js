const mongoose = require("mongoose");

const contactLeadSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, default: "", trim: true },
    timezone: { type: String, default: "" },
    country: { type: String, default: "" },
    status: {
      type: String,
      enum: ["requested", "In Progress", "On Going", "Hold", "Cancelled", "Completed"],
      default: "requested"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.ContactLead ||  mongoose.model("ContactLead", contactLeadSchema);