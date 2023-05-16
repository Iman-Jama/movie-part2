const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Renders the registration form
router.get("/register", async (req, res) => {
  return res.render("register");
});

// Handles registration form submission
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Creates a new user
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // Logs in and authenticate the newly registered user
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

module.exports = router;
