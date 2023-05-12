const User = require("./User");
const Movie = require("./Movies");
const Review = require("./Review");

User.hasMany(Review, {
  as: "user_reviews",
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

module.exports = { User, Movie, Review };
