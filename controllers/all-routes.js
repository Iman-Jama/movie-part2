const app = require("../server.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Movie, Watchlist } = require("../models");
const { routes, response } = require("../server.js");
const passport = require("passport");
const e = require("express");

let isauthenticated = false;

router.get("/", async (req, res) => {
  return res.render("home", { title: "page", isauthenticated: true });
});

router.get("/user/:num", async (req, res) => {
  return res.render("user", users[req.params.num - 1]);
});

router.get("/login", async (req, res) => {
  return res.render("login", { title: "login" });
});

router.post("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

router.get("/register", async (req, res) => {
  return res.render("register", { title: "Register" });
});

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  return res.render("dashboard", { isauthenticated: true });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// ADD TO WATCHLIST

router.post("/filmadded", async (req, res) => {
  res.locals.currentUser = req.user;
  try {
    // add movie to watchlist
    var updateUsersMovie = await Watchlist.create({
      user_id: req.user.user_id,
      movie_name: req.body.movieName,
    });
    console.log("Movie added to watchlist successfully!");
  } catch (err) {
    console.log(err);
    console.log("Movie not added to watchlist.");
  }
  return;
});

// VIEW WATCHLIST

router.get("/filmlist", async (req, res) => {
  // create variable to get current user

  res.locals.currentUser = req.user;

  // find all movies within the watchlist that match the current user's user_id

  const watchlistMovies = await Watchlist.findAll({
    where: {
      user_id: req.user.user_id,
    },
  });

  // serialise the data so it is in separate objects

  var movieData = watchlistMovies.map((movie_name) =>
    movie_name.get({ plain: true })
  );

  // fetch only the poster_url and description using the movie_names from the movie table
  // promise.all ensures all the data is received before proceeding to return all the data together
  Promise.all(
    // serialise each object received from searching the movie table using the movie_name
    movieData.map(async (item) => {
      const movie = await Movie.findOne({
        // request the poster_url and description where the movie_name is in the original watchlist array

        attributes: ["poster_url", "description"],
        where: {
          movie_name: item.movie_name,
        },
      });
      return {
        movie_name: item.movie_name,
        poster_url: movie.poster_url,
        description: movie.description,
      };
    })
  ).then((watchlistData) => {
    return res.render("filmlist", {
      title: "filmlist",
      watchlistData,
    });
  });
});

router.post("/filmlist", (req, res) => {
  res.locals.currentUser = req.user;
  const watchlistMovie = Watchlist.findAll({
    where: {
      user_id: req.user.user_id,
    },
  });
  console.log(watchlistMovie);
  if (watchlistMovie == null) {
    return res.render("filmlist", {
      title: "filmlist",
      movie_name: "No movies in database!",
    });
  } else {
    return res.render("filmlist", {
      title: "filmlist",
      movie_name: watchlistMovie,
    });
  }
});

// // REMOVE FILM FROM WATCHLIST

router.post("/filmremoved", async (req, res) => {
  res.locals.currentUser = req.user;
  Watchlist.destroy({
    where: {
      user_id: req.user.user_id,
      movie_name: req.body.movie_name,
    },
  }).then(() => {
    res.redirect("/filmlist");
  });
});

// FETCH FILM DATA FROM APIS

router.post("/film", async (req, res) => {
  var { movieName } = req.body;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9",
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    },
  };

  // First API call to The Movie Database Alternative for Title and imdbID

  fetch(
    "https://movie-database-alternative.p.rapidapi.com/?s=" +
      movieName +
      "&r=json&page=1",
    options
  )
    // Parse the response to json
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // check input is valid
      if (data.hasOwnProperty("Search")) {
        // Get Title from the first Search result
        var movieTitleResults = data.Search[0].Title;

        // Get the imdbIDKey from the first Search result
        var imdbIDKey = data.Search[0].imdbID;

        // Second API call to The Movie Database
        var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

        fetch(
          "https://api.themoviedb.org/3/movie/" +
            imdbIDKey +
            "?api_key=" +
            secondAPIKey +
            "&language=en-US"
        )
          // Parse the response to json
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // Get Movie Title, Genre, Plot, Rating and Runtime from the fetch response
            movieName = data.original_title;
            var genre = data.genres[0].name;
            var description = data.overview;
            var posterURL =
              "https://image.tmdb.org/t/p/w500" + data.poster_path;
            var rating = Math.round(data.popularity);
            var runtime = data.runtime;

            fetch(
              "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwgbAu1Gc2IwjwgERI4QF7O9pogMLMmo4&type=video&part=snippet&maxResults=1&q=movie%20trailer%20" +
                movieName
            )
              .then(function (response) {
                return response.json();
              })

              .then(async function (data) {
                // var { videoId } = data.items[0].id;

                // var trailer = "https://www.youtube.com/embed/" + videoId;

                var movieData = {
                  movie_name: movieName,
                  imdb_id: imdbIDKey,
                  runtime: runtime,
                  description: description,
                  genre: genre,
                  poster_url: posterURL,
                  rating: rating,
                  runtime: runtime,
                  // trailer: trailer,
                };

                try {
                  // add movie to database
                  const newMovie = await Movie.create(movieData);
                  console.log("Movie added successfully!");
                } catch (err) {
                  console.log(err);
                  console.log("Movie not added.");
                }

                return res.render("film", {
                  movieName: movieName,
                  genre: genre,
                  description: description,
                  poster_URL: posterURL,
                  rating: rating,
                  // trailer: trailer,
                  runtime: runtime,
                });
              });
          });
        // show status code 500 if no movie found in API database
      } else {
        res.status(500).send("Server error");
      }
    });
});

module.exports = router;
