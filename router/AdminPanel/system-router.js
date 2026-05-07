const express = require("express");
const roleMiddleware = require("../../middlewares/roleMiddleware");
const { authmiddleware } = require("../../src/auth");
const contactLeadController = require("../../controllers/AdminPanel/System/contactlead-controller");
const demoBookController = require("../../controllers/AdminPanel/System/demobook-controller");

const systemRouter = express.Router();

systemRouter.post("/contactlead", roleMiddleware, contactLeadController.createContactLead);
systemRouter.post("/demobook", roleMiddleware, demoBookController.createDemoBook);

systemRouter.get("/contactlead", roleMiddleware, authmiddleware, contactLeadController.getAllContactLeads);
systemRouter.get("/demobook", roleMiddleware, authmiddleware, demoBookController.getAllDemoBooks);

module.exports = systemRouter;
