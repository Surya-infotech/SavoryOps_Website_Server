const express = require("express");
const roleMiddleware = require("../middlewares/roleMiddleware");
const adminController = require("../controllers/UserType/admin-controller");

const userTypeRouter = express.Router();

userTypeRouter.post("/admin/signin", roleMiddleware, adminController.signinAdmin);

module.exports = userTypeRouter;
