const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Movie extends Model {}

Movie.init(
  {
    // define columns

    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Imdb_ID: {
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
      type: DataTypes.STRING,
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
    reviews: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "movie_reviews",
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "movie",
  }
);

module.exports = Movie;
