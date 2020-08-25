CREATE TABLE `users` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `passwords` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `website` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

INSERT INTO `passwords` (user_id, website, username, password) VALUES (5, "facebook.com", "fbUser", "password11");
INSERT INTO `passwords` (user_id, website, username, password) VALUES (5, "twitter.com", "tweetUser", "password12");
INSERT INTO `passwords` (user_id, website, username, password) VALUES (5, "instagram.com", "igUser", "password13");
INSERT INTO `passwords` (user_id, website, username, password) VALUES (5, "youtube.com", "ytUser", "password14");