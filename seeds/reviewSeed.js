const sequelize = require('../config/connection');
const { Review } = require('../models');

const reviewData = require('./reviewData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();