const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Review extends Model {}

Review.init(
  {
    // define columns
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    imdb_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "movie",
        key: "imdb_id",
      },
    },
    review_text: {
      type: DataTypes.STRING(500),
      allowNull: false,
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
