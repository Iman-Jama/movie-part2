const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Review extends Model {}

Review.init(
    {
      // define columns
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
          }
      },
      movie_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'movie',
            key: 'id',
          }
      },
      review_text: {
        type:DataTypes.STRING,
        allowNull: false,
      },

    },
    
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'review',
    }
  );

  module.exports = Review;