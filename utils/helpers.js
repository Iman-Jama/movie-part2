const handlebars = require("handlebars");

// Helper function to check if a movie is in the watchlist
const isInWatchlist = (movieName, watchlist) => {
  if (!Array.isArray(watchlist)) {
    return false; // Returns false if watchlist is not an array
  }

  return watchlist.some((item) => item.movie_name === movieName);
};

// Helper function to encode a URI component which makes it so it is a valid URL
const encodeURI = (component) => {
  return encodeURIComponent(component);
};

// Register the helpers with Handlebars
handlebars.registerHelper("isInWatchlist", isInWatchlist);
handlebars.registerHelper("encodeURI", encodeURI);

// Export the helpers so they can be accessible globally.
module.exports = {
  isInWatchlist: isInWatchlist,
  encodeURI: encodeURI,
};
