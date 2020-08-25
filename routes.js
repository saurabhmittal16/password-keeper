const express = require("express");
const router = express.Router();
const controller = require("./controller");

// create new user route
router.post("/user", controller.signup);

// login route
router.post("/user/auth", controller.login);

module.exports = router;
