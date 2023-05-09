const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Movie extends Model {}

Movie.init(
    {
      // define columns
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      movie_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      imdbID: {
        type: DataTypes.STRING,
        unique: true,
      },
      release_year: {
        type:DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trailer: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      
    },
    
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'movie',
    }
  );

  module.exports = Movie;