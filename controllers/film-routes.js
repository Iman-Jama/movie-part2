const express = require("express");
const router = express.Router();
const { Watchlist, Movie, Review, SearchHistory } = require("../models");

// router.post("/film", async (req, res) => {
//   console.log(req);
//   var { movieName } = req.body;

//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9",
//       "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
//     },
//   };

//   // First API call to The Movie Database Alternative for Title and imdbID

//   fetch(
//     "https://movie-database-alternative.p.rapidapi.com/?s=" +
//       movieName +
//       "&r=json&page=1",
//     options
//   )
//     // Parse the response to json
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // check input is valid
//       if (data.hasOwnProperty("Search")) {
//         // Get Title from the first Search result
//         var movieTitleResults = data.Search[0].Title;

//         // Get the imdbIDKey from the first Search result
//         var imdbIDKey = data.Search[0].imdbID;

//         // Second API call to The Movie Database
//         var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

//         fetch(
//           "https://api.themoviedb.org/3/movie/" +
//             imdbIDKey +
//             "?api_key=" +
//             secondAPIKey +
//             "&language=en-US"
//         )
//           // Parse the response to json
//           .then(function (response) {
//             return response.json();
//           })
//           .then(function (data) {
//             // Get Movie Title, Genre, Plot, Rating and Runtime from the fetch response
//             movieName = data.original_title;
//             var genre = data.genres[0].name;
//             var description = data.overview;
//             var posterURL =
//               "https://image.tmdb.org/t/p/w500" + data.poster_path;
//             var rating = Math.round(data.popularity);
//             var runtime = data.runtime;

//             fetch(
//               "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDM84Q5kKRoiKTM5XfoP7L8PCpL5im6eXU&type=video&part=snippet&maxResults=1&q=movie%20trailer%20" +
//                 movieName
//             )
//               .then(function (response) {
//                 return response.json();
//               })

//               .then(async function (data) {
//                 var { videoId } = data.items[0].id;

//                 var trailer = "https://www.youtube.com/embed/" + videoId;
//                 var movieData = {
//                   movie_name: movieName,
//                   imdb_id: imdbIDKey,
//                   runtime: runtime,
//                   description: description,
//                   genre: genre,
//                   poster_url: posterURL,
//                   rating: rating,
//                   runtime: runtime,
//                   trailer: trailer,
//                 };

//                 let reviews = [];
//                 let reviewID = [];
//                 try {
//                   // add movie to database
//                   // search for movie in database based on imdb_id
//                   const existingMovie = await Movie.findOne({
//                     where: {
//                       imdb_id: imdbIDKey,
//                     },
//                   });

//                   if (existingMovie) {
//                     console.log("Movie already exists in the database!");
//                   } else {
//                     // add movie to database
//                     const newMovie = await Movie.create(movieData);
//                     console.log("Movie added successfully!");
//                   }

//                   // search for associated reviews
//                   const filmReviews = await Review.findAll({
//                     where: { imdb_id: imdbIDKey },

//                     attributes: ["review_text", "review_id"],
//                   });

//                   reviews = filmReviews.map(
//                     (review) => review.dataValues.review_text
//                   );

//                   reviewID = filmReviews.map(
//                     (review) => review.dataValues.review_id
//                   );
//                   // associate reviews with new movie
//                   console.log(reviews);

//                   console.log(
//                     "Movie added successfully with associated reviews!"
//                   );
//                 } catch (err) {
//                   console.log(err);
//                   console.log("Movie not added.");
//                 }

//                 // Store the search in the SearchHistory table
//                 const userID = req.user.user_id;

//                 const searchHistoryData = {
//                   user_id: userID,
//                   movieName: movieName,
//                   search_date: new Date(),
//                   imdb_id: imdbIDKey,
//                   poster_url: posterURL,
//                 };

//                 try {
//                   const newSearchHistory = await SearchHistory.create(
//                     searchHistoryData,
//                     {
//                       fields: [
//                         "user_id",
//                         "movieName",
//                         "search_date",
//                         "imdb_id",
//                         "poster_url",
//                       ],
//                     }
//                   );

//                   console.log("Search history stored successfully!");
//                 } catch (error) {
//                   console.error("Error storing search history:", error);
//                 }

//                 return res.render("film", {
//                   movieName: movieName,
//                   genre: genre,
//                   description: description,
//                   poster_URL: posterURL,
//                   rating: rating,
//                   trailer: trailer,
//                   runtime: runtime,
//                   reviews: reviews,
//                   review_id: reviewID,
//                   imdb_id: imdbIDKey,
//                   isauthenticated: true, // Pass the isauthenticated variable to the view
//                 });
//               });
//           });
//         // show status code 500 if no movie found in API database
//       } else {
//         res.status(500).send("Server error");
//       }
//     });
// });

// router.get("/film/:movieName", async (req, res) => {
//   console.log(req);
//   var movieName = decodeURIComponent(req.params.movieName);

//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "019a625d93msh4b8ca83c4e651e4p1b04f6jsn06afb2002bf9",
//       "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
//     },
//   };

//   // First API call to The Movie Database Alternative for Title and imdbID

//   fetch(
//     "https://movie-database-alternative.p.rapidapi.com/?s=" +
//       movieName +
//       "&r=json&page=1",
//     options
//   )
//     // Parse the response to json
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // check input is valid
//       if (data.hasOwnProperty("Search")) {
//         // Get Title from the first Search result
//         var movieTitleResults = data.Search[0].Title;

//         // Get the imdbIDKey from the first Search result
//         var imdbIDKey = data.Search[0].imdbID;

//         // Second API call to The Movie Database
//         var secondAPIKey = "97c267f9a2d9d89d1419f2261423af96";

//         fetch(
//           "https://api.themoviedb.org/3/movie/" +
//             imdbIDKey +
//             "?api_key=" +
//             secondAPIKey +
//             "&language=en-US"
//         )
//           // Parse the response to json
//           .then(function (response) {
//             return response.json();
//           })
//           .then(function (data) {
//             // Get Movie Title, Genre, Plot, Rating and Runtime from the fetch response
//             movieName = data.original_title;
//             var genre = data.genres[0].name;
//             var description = data.overview;
//             var posterURL =
//               "https://image.tmdb.org/t/p/w500" + data.poster_path;
//             var rating = Math.round(data.popularity);
//             var runtime = data.runtime;

//             fetch(
//               "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwgbAu1Gc2IwjwgERI4QF7O9pogMLMmo4&type=video&part=snippet&maxResults=1&q=movie%20trailer%20" +
//                 movieName
//             )
//               .then(function (response) {
//                 return response.json();
//               })

//               // var { videoId } = data.items[0].id;

//               // var trailer = "https://www.youtube.com/embed/" + videoId;

//               .then(async function (data) {
//                 var movieData = {
//                   movie_name: movieName,
//                   imdb_id: imdbIDKey,
//                   runtime: runtime,
//                   description: description,
//                   genre: genre,
//                   poster_url: posterURL,
//                   rating: rating,
//                   runtime: runtime,
//                   // trailer: trailer,
//                 };

//                 let reviews = [];
//                 let reviewID = [];
//                 try {
//                   // add movie to database
//                   // search for movie in database based on imdb_id
//                   const existingMovie = await Movie.findOne({
//                     where: {
//                       imdb_id: imdbIDKey,
//                     },
//                   });

//                   if (existingMovie) {
//                     console.log("Movie already exists in the database!");
//                   } else {
//                     // add movie to database
//                     const newMovie = await Movie.create(movieData);
//                     console.log("Movie added successfully!");
//                   }

//                   // search for associated reviews
//                   const filmReviews = await Review.findAll({
//                     where: { imdb_id: imdbIDKey },

//                     attributes: ["review_text", "review_id"],
//                   });

//                   reviews = filmReviews.map(
//                     (review) => review.dataValues.review_text
//                   );

//                   reviewID = filmReviews.map(
//                     (review) => review.dataValues.review_id
//                   );
//                   // associate reviews with new movie
//                   console.log(reviews);

//                   console.log(
//                     "Movie added successfully with associated reviews!"
//                   );
//                 } catch (err) {
//                   console.log(err);
//                   console.log("Movie not added.");
//                 }

//                 // Store the search in the SearchHistory table
//                 const userID = req.user.user_id;

//                 const searchHistoryData = {
//                   user_id: userID,
//                   movieName: movieName,
//                   search_date: new Date(),
//                   imdb_id: imdbIDKey,
//                   poster_url: posterURL,
//                 };

//                 try {
//                   const newSearchHistory = await SearchHistory.create(
//                     searchHistoryData,
//                     {
//                       fields: [
//                         "user_id",
//                         "movieName",
//                         "search_date",
//                         "imdb_id",
//                         "poster_url",
//                       ],
//                     }
//                   );

//                   console.log("Search history stored successfully!");
//                 } catch (error) {
//                   console.error("Error storing search history:", error);
//                 }

//                 return res.render("film", {
//                   movieName: movieName,
//                   genre: genre,
//                   description: description,
//                   poster_URL: posterURL,
//                   rating: rating,
//                   trailer: trailer,
//                   runtime: runtime,
//                   reviews: reviews,
//                   review_id: reviewID,
//                   imdb_id: imdbIDKey,
//                   isauthenticated: true, // Pass the isauthenticated variable to the view
//                 });
//               });
//           });
//         // show status code 500 if no movie found in API database
//       } else {
//         res.status(500).send("Server error");
//       }
//     });
// });
