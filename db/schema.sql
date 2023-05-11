-- DROP DATABASE
DROP DATABASE IF EXISTS movie_db;

-- CREATE DATABASE
CREATE DATABASE movie_db;

USE movie_db;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(60)
);

CREATE TABLE movies (
    movie_name VARCHAR(100) NOT NULL,
    description VARCHAR(400) NOT NULL,
    imdb_ID VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    rating INT NOT NULL,
    runtime INT NOT NULL,
    trailer VARCHAR (200) NOT NULL,
    INDEX (imdb_ID)
);

CREATE TABLE review (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    imdb_ID VARCHAR(100) NOT NULL,
    review_text VARCHAR(300) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(imdb_ID) REFERENCES movies(imdb_ID)
);
