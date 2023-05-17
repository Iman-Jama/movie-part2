//dependencies
const User = require("./User");
const Movie = require("./Movies");
const Review = require("./Review");
const Watchlist = require("./Watchlist");
const SearchHistory = require("./SearchHistory");

//This is our index.js file within our models folder.
//This file is creating the relationships between the tables allowing data to be added to different places within the database.

User.hasMany(Watchlist, {
  foreignKey: "user_id",
});

Movie.hasMany(Watchlist, {
  foreignKey: "movie_name",
});

User.hasMany(Review, {
  as: "user_reviews",
  foreignKey: "user_id",
});

Movie.belongsTo(User, {
  foreignKey: "user_id",
});

Movie.hasMany(Review, {
  as: "movie_reviews",
  foreignKey: "imdb_id",
});

Review.belongsTo(Movie, {
  foreignKey: "imdb_id",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Movie, Review, Watchlist, SearchHistory };
