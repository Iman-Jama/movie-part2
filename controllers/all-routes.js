const router = require("express").Router();
const { Movie, Watchlist, Review, SearchHistory } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Checks if the user is authenticated
    const loggedIn = req.isAuthenticated();

    // Renders the home page with loggedIn status
    res.render("home", { loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/user/:num", async (req, res) => {
  return res.render("user", Users[req.params.num - 1]);
});

router.get("/login", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }

  return res.render("login", { title: "login" });
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/dashboard", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  try {
    // Fetch the recently searched movies from the database
    const recentlySearchedMovies = await Movie.findAll({
      order: [["created_at", "DESC"]],
      limit: 5,
    });

    const username = req.user.username;
    const userID = req.user.user_id;

    // Render the dashboard page and pass the recently searched movies and username to the view
    res.render("dashboard", {
      recentlySearchedMovies,
      username,
      userID,
      isauthenticated: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
