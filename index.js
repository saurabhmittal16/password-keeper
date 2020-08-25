const mysql = require("mysql");
const express = require("express");

var app = express();
require("dotenv").config();

const port = process.env.PORT || 8000;

// MySQL details
var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
    res.send("Welcome to the password keeper");
});

const appRoutes = require("./routes");

app.use("/app", appRoutes);

mysqlConnection.connect((err) => {
    if (!err) console.log("Connection Established Successfully");
    else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = mysqlConnection;
