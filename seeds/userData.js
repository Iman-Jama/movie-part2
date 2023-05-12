const {User}= require('../models');

const userData =
[
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    },
    {
      "id": 2,
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "janesmith@example.com",
      "password": "password456"
    },
    {
      "id": 3,
      "first_name": "Bob",
      "last_name": "Johnson",
      "email": "bobjohnson@example.com",
      "password": "password789"
    }
  ]

  const seedUsers = () => User.bulkCreate(userData);

  module.exports = seedUsers; 