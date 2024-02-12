const express = require("express");
const router = express.Router();
const upload = require("../helpers/upload.js");
const controllerWrapper = require("../helpers/ContollerWrapp.js");
const validateBody = require("../helpers/validateBody.js");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserAvatar
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
router.patch("/avatars", authChecker, upload.single("avatar"), controllerWrapper(updateUserAvatar));


module.exports = router;
