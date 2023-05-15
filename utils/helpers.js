const handlebars = require('handlebars');

const isInWatchlist = (movieName, watchlist) => {
  if (!Array.isArray(watchlist)) {
    return false; // or handle the case when watchlist is not an array
  }

  return watchlist.some((item) => item.movie_name === movieName);
};

handlebars.registerHelper('isInWatchlist', isInWatchlist);

module.exports = {
  isInWatchlist: isInWatchlist
};





