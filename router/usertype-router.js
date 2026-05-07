const express = require("express");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { authmiddleware } = require("../src/auth");
const adminController = require("../controllers/UserType/admin-controller");

const userTypeRouter = express.Router();

userTypeRouter.post("/admin/signin", roleMiddleware, adminController.signinAdmin);
userTypeRouter.get("/admin/verify-token", roleMiddleware, authmiddleware, adminController.verifyAdminToken);

module.exports = userTypeRouter;
