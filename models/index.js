const User = require("./User");
const Movie = require("./Movies");
const Review = require("./Review");

Review.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Review, {
  as: "user_reviews",
  foreignKey: "user_id",
});

Movie.hasMany(Review, {
  as: "movie_reviews",
  foreignKey: "imdb_ID",
});

Review.belongsTo(User, {
  foreignKey: "imdb_ID",
});

module.exports = { User, Movie, Review };
