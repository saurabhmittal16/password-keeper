const { createCipheriv, createDecipheriv, randomBytes, createHash } = require("crypto");

// generate a key of length 32 using SECRET_KEY
const key = createHash("sha256").update(String(process.env.SECRET_KEY)).digest("base64").substr(0, 32);

// chosen algorithm for encryption
const ALGORITHM = "aes256";

// length of initialisation vector
const IV_LENGTH = 16;

module.exports = {
    encrypt(input) {
        const iv = randomBytes(IV_LENGTH / 2).toString("hex");
        const cipher = createCipheriv(ALGORITHM, key, iv);
        const encrypted = iv + cipher.update(input, "utf8", "hex") + cipher.final("hex");
        return encrypted;
    },
    decrypt(encrypted) {
        const iv = encrypted.substr(0, IV_LENGTH);
        const decipher = createDecipheriv(ALGORITHM, key, iv);
        const decrypted = decipher.update(encrypted.substr(IV_LENGTH), "hex", "utf8") + decipher.final("utf8");
        return decrypted;
    },
};
