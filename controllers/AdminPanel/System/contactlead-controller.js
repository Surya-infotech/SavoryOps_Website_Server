const ContactLead = require("../../../models/AdminPanel/System/contactlead-model");

const createContactLead = async (req, res) => {
  try {
    const lead = await ContactLead.create(req.body);
    return res.status(201).json({ message: "Contact lead created", lead });
  } catch (error) {
    console.log("Create contact lead error:", error);
    return res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

const getAllContactLeads = async (req, res) => {
  try {
    const leads = await ContactLead.find().sort({ createdAt: -1 });
    if (!leads.length) {
      return res.status(200).json({ message: "No contact lead found", leads: [] });
    }
    return res.status(200).json({ message: "Contact leads fetched", leads });
  } catch (error) {
    console.log("Get contact leads error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createContactLead, getAllContactLeads };