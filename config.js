const mysql = require("mysql");

// MySQL details
const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

mysqlConnection.connect((err) => {
    if (!err) console.log("Connection Established Successfully");
    else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;
