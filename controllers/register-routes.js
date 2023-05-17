const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Renders the registration form
router.get("/register", async (req, res) => {
  const error = req.query.error; // Get the error message from query parameters
  return res.render("register", { error });
});

// Handles registration form submission
router.post("/register", async (req, res, next) => {
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
    // Check if the error is due to existing username or email
    if (
      error.name === "SequelizeUniqueConstraintError" &&
      (error.errors[0].path === "username" || error.errors[0].path === "email")
    ) {
      const errorMessage = "Username or email already exists";
      return res.redirect(
        `/register?error=${encodeURIComponent(errorMessage)}`
      );
    }

    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
