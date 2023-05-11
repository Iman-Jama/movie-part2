const express = require("express");
const routes = require("express").Router();
const { Review, Movies, User } = require("../../models");

// CRUD here#
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
