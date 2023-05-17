-- DROP DATABASE - this deletes the database if one with this name exists, this also means that any user inputs have to be remade if the schema is re-run.
DROP DATABASE IF EXISTS movie_db;

-- CREATE DATABASE - this then creates a db with that name 
CREATE DATABASE movie_db;

-- USE DATABASE - this then tells mysql/sequelize what the name of the db is that you want to use. 
USE movie_db;

