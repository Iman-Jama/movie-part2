//imports the neccessary models and datatypes for sequelize.
const { Model, DataTypes } = require("sequelize");
//database connection
const sequelize = require("../config/connection.js");

class Movie extends Model {}
//init method initialises the model
Movie.init(
  {
    // define columns for the table which gets stored in the database
    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imdb_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    runtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trailer: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "",
      unique: false,
    },
    poster_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    user_id: {
      unique: true,
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  //specifies the database connection, disables auto timestamp.
  //underscored: true converst camelCase to snake_case
  //model name sets the model name to movie therefore this name should be referenced 
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "movie",
  }
);

module.exports = Movie;
