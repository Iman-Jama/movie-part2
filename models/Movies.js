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
      allowNull: false,
      unique: true,
    },
    poster_url: {
      type: DataTypes.STRING(500),
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
