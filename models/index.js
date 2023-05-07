const User = require('./User');
const Watchlist = require('./Watchlist');
const Movie = require('./Movies')

User.belongsToMany(Movie, {
    through: Watchlist
  });

Movie.belongsToMany(User, {
    through: Watchlist
});

module.exports = {User, Movie, Watchlist}

