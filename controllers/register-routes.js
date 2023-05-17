const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Renders the registration form
router.get("/register", async (req, res) => {
  const error = req.query.error; // this then gets the error message from the query parameters
  return res.render("register", { error });
});

// Handles registration form submission
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Checks if password and confirm password match, if they do not, it tells the user they do not match and catches the error.
    if (password !== confirmPassword) {
      const errorMessage = "Passwords do not match";
      return res.redirect(
        `/register?error=${encodeURIComponent(errorMessage)}`
      );
    }

    // Creates a new user using the fileds, username, email and password
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // Logs in and authenticates the newly registered user
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      // Redirect the user to their dashboard which is only accesible if the user is authenticated.
      return res.redirect("/dashboard");
    });
  } catch (error) {
    // Checks if the error is due to existing username or email , if it is, an error is displayed to the user to tell them.
    // It also comapres it to the SequelizeUniqueConstraintError which is the same as above and errors in the terminal for duplicate entries.
    if (
      error.name === "SequelizeUniqueConstraintError" &&
      (error.errors[0].path === "username" || error.errors[0].path === "email")
    ) {
      const errorMessage = "Username or email already exists";
      return res.redirect(
        `/register?error=${encodeURIComponent(errorMessage)}`
      );
    }
    //console logs are mostly added for development purposes.
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

//this is exporting router so it is accessible globally.
module.exports = router;
