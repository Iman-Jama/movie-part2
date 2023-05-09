-- DROP DATABASE
DROP DATABASE IF EXISTS movie_db;

-- CREATE DATABASE
CREATE DATABASE movie_db;

USE movie_db;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    username VARCHAR(30),
    password VARCHAR(30)
);
