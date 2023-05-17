const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class SearchHistory extends Model {}

//init method initialises the model
SearchHistory.init(
  {
    // define columns for the table which gets stored in the database
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
  //specifies the database connection, disables auto timestamp.
  //underscored: true converst camelCase to snake_case
  //model name sets the model name to movie therefore this name should be referenced
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "search_history",
  }
);

module.exports = SearchHistory;
