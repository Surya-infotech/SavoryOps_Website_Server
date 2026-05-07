const express = require("express");
const { authmiddleware } = require("../../src/auth");
const contactLeadController = require("../../controllers/AdminPanel/System/contactlead-controller");
const demoBookController = require("../../controllers/AdminPanel/System/demobook-controller");

const systemRouter = express.Router();

systemRouter.post("/contactlead", contactLeadController.createContactLead);
systemRouter.post("/demobook", demoBookController.createDemoBook);

systemRouter.get("/contactlead", authmiddleware, contactLeadController.getAllContactLeads);
systemRouter.put("/contactlead/:contactId", authmiddleware, contactLeadController.updateContactLeadStatus);
systemRouter.get("/demobook", authmiddleware, demoBookController.getAllDemoBooks);

module.exports = systemRouter;