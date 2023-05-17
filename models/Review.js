const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Review extends Model {}

//init method initialises the model
Review.init(
  {
    // define columns for the table which gets stored in the database
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
  //specifies the database connection, disables auto timestamp.
  //underscored: true converst camelCase to snake_case
  //model name sets the model name to movie therefore this name should be referenced
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "review",
  }
);

module.exports = Review;
