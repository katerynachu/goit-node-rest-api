const express = require("express");
const router = express.Router();
const controllerWrapper = require("../helpers/ContollerWrapp.js");
const validateBody = require("../helpers/validateBody.js");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser
} = require("../controllers/usersControllers.js");
const { registerUserSchema, loginSchema } = require("../models/user.js");
const authChecker = require("../helpers/authChecker");

router.post(
  "/register",
  validateBody(registerUserSchema),
  controllerWrapper(registerUser)
);

router.post(
  "/login",
  validateBody(loginSchema),
  controllerWrapper(loginUser)
);
router.post("/logout", authChecker, controllerWrapper(logoutUser));
router.get("/current", authChecker, controllerWrapper(getCurrentUser));

module.exports = router;
