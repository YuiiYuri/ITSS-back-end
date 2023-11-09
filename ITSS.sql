CREATE TABLE `users` (
  `user_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `image` varchar(255),
  `role` varchar(255) NOT NULL,
  `auth_method` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL
);

CREATE TABLE `tasks` (
  `task_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `task_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `due_date` timestamp NOT NULL,
  `priority_id` int NOT NULL,
  `label_id` INT NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL
);

CREATE TABLE `priority` (
  `priority_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `priority_name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `color` VARCHAR(255) NOT NULL
);

CREATE TABLE `label` (
  `label_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `label_name` VARCHAR(255) NOT NULL,
  `color` VARCHAR(255) NOT NULL
);

CREATE TABLE `filter` (
  `filter_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `filter_name` VARCHAR(255) NOT NULL
);

CREATE TABLE `comments` (
  `comment_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `stand` INT NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `task_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL
);

ALTER TABLE `tasks` ADD FOREIGN KEY (`priority_id`) REFERENCES `priority` (`priority_id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`label_id`) REFERENCES `label` (`label_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

