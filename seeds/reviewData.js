const {Review}= require('../models');

const reviewData =
[
    {
        "review_id": "1",
        "user_id": "1",
        "imdb_id": "tt0381707",
        "review_text":"Really funny film"
    },
    {
        "review_id": "2",
        "user_id": "2",
        "imdb_id": "tt4154796",
        "review_text":"The film was too long winded"
    },
    {
        "review_id": "3",
        "user_id": "3",
        "imdb_id": "tt0111161",
        "review_text":"I really enjoyed this film, it made me laugh"
      
    },
    {
        "review_id": "4",
        "user_id": "4",
        "imdb_id": "tt0126029",
        "review_text":"Not the best film."
    }   
  ]

  const seedReviews = () => Review.bulkCreate(reviewData);

  module.exports = seedReviews;