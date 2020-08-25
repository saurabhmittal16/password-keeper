const express = require("express");
const router = express.Router();

const connection = require("./index");

router.get("/auth", (req, res) => {
    res.send("Auth route");
});

module.exports = router;
