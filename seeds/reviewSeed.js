const sequelize = require('../config/connection');

const seedUsers = require('./userData');
const seedMovies = require('./movieData');
const seedReviews = require('./reviewData')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedMovies();

  await seedReviews();

  process.exit(0);
};

seedAll();