const bcrypt = require("bcryptjs");
const { encrypt, decrypt } = require("./utils");
const connection = require("./config");

exports.signup = (req, res) => {
    const { username, password } = req.body;

    // hash password before storing
    const hashPassword = bcrypt.hashSync(password);

    connection.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashPassword], (err) => {
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
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    connection.query("SELECT * FROM users WHERE username=?", [username], (err, results) => {
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
            // compare received password with stored hash
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
    });
};

exports.getPasswords = (req, res) => {
    const userId = parseInt(req.query.user);

    connection.query("SELECT website, username, password FROM passwords WHERE user_id=?", [userId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send({
                message: "some error occured",
            });
        } else {
            results.map((item) => {
                // for each password store, decrypt and send to user
                item.password = decrypt(item.password);
                return item;
            });
            res.send(results);
        }
    });
};

exports.addPassword = (req, res) => {
    const userId = parseInt(req.query.user);
    const { username, password, website } = req.body;

    // check if user with given id exists
    connection.query("SELECT * FROM users WHERE id=?", [userId], (err, result) => {
        if (err || result.length === 0) {
            console.log(err);
            res.status(500);
            res.send({
                message: "no such user",
            });
        } else {
            // encrypt the password before saving in the db
            const encryptedPassword = encrypt(password);

            connection.query(
                "INSERT INTO passwords (user_id, website, username, password) VALUES (?, ?, ?, ?)",
                [userId, website, username, encryptedPassword],
                (error) => {
                    if (err) {
                        console.log(error);
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
        }
    });
};
