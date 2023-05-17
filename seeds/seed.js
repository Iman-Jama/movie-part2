const sequelize = require("../config/connection");
const { Review, User, Movie } = require("../models");

// Importing seed data from JSON files which contains hardcoded data
const userData = require("./userData.json");
const movieData = require("./movieData.json");
const reviewData = require("./reviewData.json");

// This functions seeds the database with initial data
const seedDatabase = async () => {
  // This syncs the Sequelize models with the database
  await sequelize.sync({ force: true });

  // This is using bulkCreate to buld create the user data with individual hooks enabled
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // This is using bulkCreate to buld create the movie data.
  await Movie.bulkCreate(movieData, {
    individualHooks: true,
    returning: true,
  });

  // This is using bulkCreate to buld create the review data with individual hooks enabled
  await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });

  // This exits the process once the seeding is complete
  process.exit(0);
};

// This is calling the seedDatabase function to seed the database
seedDatabase();
