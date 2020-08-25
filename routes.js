const express = require("express");
const router = express.Router();
const controller = require("./controller");

// create new user route
router.post("/user", controller.signup);

// login route
router.post("/user/auth", controller.login);

// list saved usernames, passwords for websites
router.get("/sites/list", controller.getPasswords);

// add a password entry
router.post("/sites", controller.addPassword);

module.exports = router;
