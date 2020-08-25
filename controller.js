const bcrypt = require("bcryptjs");
const connection = require("./config");

exports.signup = (req, res) => {
    const { username, password } = req.body;

    // hash password before storing
    const hashPasswprd = bcrypt.hashSync(password);

    connection.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashPasswprd],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    message: "Username taken, try another",
                });
            } else {
                res.send({
                    status: "account created",
                });
            }
        }
    );
};
