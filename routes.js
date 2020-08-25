const express = require("express");
const router = express.Router();
const controller = require("./controller");

// create new user route
router.post("/user", controller.signup);

module.exports = router;
