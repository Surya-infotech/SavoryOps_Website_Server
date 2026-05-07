const mongoose = require("mongoose");

const contactLeadSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    company: { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.ContactLead ||
  mongoose.model("ContactLead", contactLeadSchema);
