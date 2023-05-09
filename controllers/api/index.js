const routes = require("express").Router();
const movieRoutes = require("./movies");

routes.use("/movies", movieRoutes);

module.exports = routes;
