const bodyParser = require("body-parser");
const express = require("express");

var app = express();
require("dotenv").config();
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Welcome to the password keeper");
});

const appRoutes = require("./routes");
app.use("/app", appRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
