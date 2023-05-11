const routes = require("express").Router();

const apiRoutes = require("./api");

routes.use("/api", apiRoutes);

// Direct users to static files
// This needs to go through the handlebars
routes.get("/", async (req, res) => {
  res.sendFile("./index.html");
});

module.exports = routes;
