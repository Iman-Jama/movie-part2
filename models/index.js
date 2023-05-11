const User = require("./User");
const Movie = require("./Movies");
const Review = require("./Review");

Review.belongsTo(User, {
  foreignKey: "account_ID",
});

User.hasMany(Review, {
  as: "user_reviews",
  foreignKey: "account_ID",
});

Movie.hasMany(Review, {
  as: "movie_reviews",
  foreignKey: "film_imdb",
});

Review.belongsTo(Movie, {
  foreignKey: "film_imdb",
});

module.exports = { User, Movie, Review };
