const {Review}= require('../models');

const reviewData =
[
    {
      "id": "1",
      "account_ID": "4",
      "movie_imdb": "tt0381707",
      "review_text":"Really funny film"
    },
    {
        "id": "2",
        "account_ID": "5",
        "movie_imdb":"tt4154796",
        "review_text":"The film was too long winded"
    },
    {
        "id": "3",
        "account_ID": "6",
        "movie_imdb": "tt0111161",
        "review_text":"I really enjoyed this film, it made me laugh"
      
    }
    
  ]

  const seedReviews = () => Movie.bulkCreate(Reviewdata);

module.exports = seedReviews;