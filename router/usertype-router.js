const express = require("express");
const adminController = require("../controllers/UserType/admin-controller");

const userTypeRouter = express.Router();

userTypeRouter.post("/admin/signin", adminController.signinAdmin);

module.exports = userTypeRouter;
