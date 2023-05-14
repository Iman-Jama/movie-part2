const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Watchlist extends Model {}

Watchlist.init(
  {
    // define columns
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
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "watchlist",
  }
);

module.exports = Watchlist;
