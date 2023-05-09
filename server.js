// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const sequelize = require("./config/connection");
const hbs = exphbs.create({});

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3008;

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "css")));
app.use(require("./controllers/all-routes"));

// Connects to DB & starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  console.log("Database connected!");
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});

module.exports = app;
