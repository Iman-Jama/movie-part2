const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const sequelize = require("./config/connection");
const hbs = exphbs.create({});
const helpers = require("./utils/helpers");

const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./config/passport-config");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const routes = require("./controllers");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3008;

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Static directory
app.use(express.static(path.join(__dirname, "public")));

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// app.use("/", routes);
app.use(require("./controllers/all-routes"));
app.use(require("./controllers/register-routes"));
app.use(require("./controllers/login-routes"));
app.use(require("./controllers/search-history-routes"));
app.use(require("./controllers/film-routes"));
app.use("/api", require("./controllers/api/movies"));

// Connects to DB & starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
  console.log("Database connected!");
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});

// Starts the server to begin listening
// app.listen(PORT, () => {
//   console.log("Server listening on: http://localhost:" + PORT);

// });

module.exports = app;
