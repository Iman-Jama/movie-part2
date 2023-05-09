const User = require("./User");
const Movie = require("./Movies");
const Review = require("./Review");

Review.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Review, {
  foreignKey: "user_id",
});

Movie.hasMany(Review, {
  foreignKey: "imdb_ID",
});

Review.belongsTo(User, {
  foreignKey: "imdb_ID",
});

module.exports = { User, Movie, Watchlist, Review, Review_List };
