const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Movie extends Model {}

Movie.init(
  {
    // define columns

    
    
    movie_name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    test_imdb: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      primaryKey: true,
    },

    runtime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reviews: {
      type: DataTypes.STRING,
      allowNull: true,
      
    },
    trailer: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "movies",
  }
);

module.exports = Movie;
