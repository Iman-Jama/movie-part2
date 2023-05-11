const app = require("../server.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { routes, response } = require("../server.js");

router.get("/", async (req, res) => {
  return res.render("home", { title: "Homepage" });
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

router.get("/filmlist", async (req, res) => {
  return res.render("filmlist", { title: "filmlist" });
});

router.get("/register", async (req, res) => {
  return res.render("register", { title: "Register" });
});

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  return res.render("dashboard");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

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
            // console.log(data);
            movieName = data.original_title;
            var genre = data.genres[0].name;
            var description = data.overview;
            console.log("https://image.tmdb.org/t/p/w500" + data.poster_path);
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
              .then(function (data) {
                // var { videoId } = data.items[0].id;

                // var trailer = "https://www.youtube.com/embed/" + videoId;
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

        // show modal if input is not a valid movie name
      } else {
        res.status(500).send("Server error");
      }
    });
});

module.exports = router;
