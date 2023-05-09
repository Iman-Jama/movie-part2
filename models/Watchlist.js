const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Watchlist extends Model {}

Watchlist.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "movie",
        key: "movie_name",
      },
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
