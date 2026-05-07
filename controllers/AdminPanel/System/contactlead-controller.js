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

const updateContactLeadStatus = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedLead = await ContactLead.findByIdAndUpdate(
      { _id: contactId },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Contact lead not found" });
    }

    return res.status(200).json({
      message: "Contact lead status updated",
      lead: updatedLead
    });
  } catch (error) {
    console.log("Update contact lead status error:", error);
    return res.status(400).json({ message: "Invalid request", error: error.message });
  }
};

module.exports = { createContactLead, getAllContactLeads, updateContactLeadStatus };