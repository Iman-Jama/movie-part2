const express = require("express");
const routes = require("express").Router();
const { Review, Movie, User } = require("../../models");
const app = require("../../server");

// CRUD here

routes.get("/moviesearch", async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      include: [
        {
          model: Movie,
          attributes: ["movie_name", "rating"],
        },
      ],
    });

    const reviewedMovies = reviewData.map((review) =>
      review.get({ plain: true })
    );

    res.render("reviews", {
      reviewedMovies,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = routes;
