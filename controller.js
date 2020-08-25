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

exports.login = (req, res) => {
    const { username, password } = req.body;

    connection.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    message: "some error occured",
                });
            } else if (results.length === 0) {
                res.status(500);
                res.send({
                    message: "user not found",
                });
            } else {
                const foundUser = results[0];
                if (bcrypt.compareSync(password, foundUser.password)) {
                    res.send({
                        status: "success",
                        userId: foundUser.id,
                    });
                } else {
                    res.status(500);
                    res.send({
                        message: "incorrect password",
                    });
                }
            }
        }
    );
};

exports.getPasswords = (req, res) => {
    const userId = parseInt(req.query.user);

    connection.query(
        "SELECT website, username, password FROM passwords WHERE user_id=?",
        [userId],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    message: "some error occured",
                });
            } else {
                res.send(results);
            }
        }
    );
};

exports.addPassword = (req, res) => {
    const userId = parseInt(req.query.user);
    const { username, password, website } = req.body;

    connection.query(
        "INSERT INTO passwords (user_id, website, username, password) VALUES (?, ?, ?, ?)",
        [userId, website, username, password],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({
                    message: "some error occured",
                });
            } else {
                res.send({
                    status: "success",
                });
            }
        }
    );
};
