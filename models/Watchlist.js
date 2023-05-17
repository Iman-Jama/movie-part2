const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Watchlist extends Model {}

//init method initialises the model
Watchlist.init(
  {
    // define columns for the table which gets stored in the database
    watchlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "movie",
        key: "movie_name",
      },
      unique: true,
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
    modelName: "watchlist",
  }
);

module.exports = Watchlist;
