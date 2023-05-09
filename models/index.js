const User = require('./User');
const Watchlist = require('./Watchlist');
const Movie = require('./Movies');
const Review_List = require('./Review_List');
const Review = require('./Review')

User.belongsToMany(Movie, {
    through: Watchlist
  });

Movie.belongsToMany(User, {
    through: Watchlist
});

User.hasMany(Review_List, { 
  foreignKey: 'user_id' });

Review_List.belongsTo(User, { 
  foreignKey: 'user_id' });

Movie.hasMany(Review, { 
  foreignKey: 'movie_id' });

Review.belongsTo(Movie, { 
  foreignKey: 'movie_id' });

User.hasMany(Review, { 
  foreignKey: 'user_id' });
Review.belongsTo(User, { 
  foreignKey: 'user_id' });

Review_List.hasMany(Review, { 
  foreignKey: 'review_id' });

Review.belongsTo(Review_List, { 
  foreignKey: 'review_id' });

User.hasOne(Watchlist, { 
  foreignKey: 'user_id' });

Watchlist.belongsTo(User, {
   foreignKey: 'user_id' });

Movie.hasMany(Watchlist, { 
  foreignKey: 'movie_name' });
  
Watchlist.belongsTo(Movie, { 
  foreignKey: 'movie_name' });

module.exports = {User, Movie, Watchlist, Review, Review_List}

