const {Movie}= require('../models');

const movieData =

[
    {
      "movie_name": "White Chicks",
      "Imdb_ID": "tt0381707",
      "runtime": "109",
      "description":"Two FBI agent brothers, Marcus and Kevin Copeland, accidentally foil a drug bust. To avoid being fired they accept a mission escorting a pair of socialites to the Hamptons--but when the girls are disfigured in a car accident, they refuse to go. Left without options, Marcus and Kevin decide to pose as the sisters, transforming themselves from black men into rich white women.",
      "genre":"Comedy",
      "rating":"48",
      "trailer":"https://www.youtube.com/watch?v=aeVkbNka9HM&t=2s",
      "poster_url":"https://m.media-amazon.com/images/M/MV5BMTY3OTg2OTM3OV5BMl5BanBnXkFtZTYwNzY5OTA3._V1_SX300.jpg"

    },
    {
        "movie_name": "Avengers Endgame",
        "Imdb_ID": "tt4154796",
        "runtime": "181",
        "description":"After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
        "genre":"Action",
        "rating":"89",
        "trailer":"https://www.youtube.com/watch?v=TcMBFSGVi1c",
        "poster_url":"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
  
      },
      {
        "movie_name": "The Shawshank Redemption",
        "Imdb_ID": "tt0111161",
        "runtime": "142",
        "description":"Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
        "genre":"Drama",
        "rating":"83",
        "trailer":"https://www.youtube.com/watch?v=6hB3S9bIaco",
        "poster_url":"https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg"
  
      }
      
  ]

  const seedMovies = () => Movie.bulkCreate(movieData);

module.exports = seedMovies;