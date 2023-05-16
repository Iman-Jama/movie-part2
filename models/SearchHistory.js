const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class SearchHistory extends Model {}

SearchHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imdb_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    search_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "search_history",
  }
);

module.exports = SearchHistory;
