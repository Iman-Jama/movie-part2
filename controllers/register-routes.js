const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/register", async (req, res) => {
  return res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Create a new user with the provided details and hashed password
    const newUser = await User.create({
      username,
      email,
      password,
    });

    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      // Redirect the user to a protected route or homepage
      return res.redirect("/dashboard");
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Authentication middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    // User is authenticated, proceed to the next middleware/route handler
    console.log("User authenticated:", req.session.user); // Log the authenticated user
    return next();
  } else {
    // User is not authenticated, redirect to the login page
    console.log("User not authenticated"); // Log that the user is not authenticated
    res.redirect("/login");
  }
}

router.get("/dashboard", isAuthenticated, (req, res) => {
  // Render the dashboard page
  return res.render("dashboard");
});

module.exports = router;
