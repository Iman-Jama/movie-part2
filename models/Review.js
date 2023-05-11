const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Review extends Model {}

Review.init(
    {
      // define columns
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      account_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user',
            key: 'id',
          }
      },
      film_imdb: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'movies',
            key: 'test_imbd',
          }
      },
      review_text: {
        type:DataTypes.STRING,
        allowNull: true,
      },

    },
    
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "review",
    }
  );

  module.exports = Review;