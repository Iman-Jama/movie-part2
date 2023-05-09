const routes = require("express").Router();

// CRUD here

// fetch movie search data
routes.get("/moviesearch", (req, res) => {
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
      req.body.movieName +
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
            // res.render -> send to handlebars to deal with the data once handlebars is set up
            res.send(data);
          });
      } else {
        res.status(404).json({ message: "No results." });
      }
    });
});

module.exports = routes;
