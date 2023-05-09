const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class ReviewsList extends Model {}

ReviewsList.init(
    { 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        reviews: {
            type: DataTypes.INTEGER,
        }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'reviewsList',
    }
)

  module.exports = ReviewsList;