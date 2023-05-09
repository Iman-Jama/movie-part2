const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Review_list extends Model {}

Review_list.init(
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
      reviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'review',
            key: 'id',
          }
      },
      review_text: {
        type:DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'review',
            key: 'review_text',
          }
      },

    },
    
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'review_list',
    }
  );

  module.exports = Review_list;