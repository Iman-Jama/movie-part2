//dependemcies
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models");

router.get("/", (req, res) => {
  res.render("/login.handlebars");
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email address
    const user = await User.findåçççOne({
      where: { email },
    });

    if (!user) {
      // If the user doesn't exist, show an error message
      return res.status(404).render("login", {
        message: "User not found",
      });
    }

    // Compare the password provided to the stored hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // If the password doesn't match, show an error message
      return res.status(401).render("login", {
        message: "Incorrect password",
      });
    }

    // Set the user's ID in the session cookie
    req.session.userId = user.id;

    // Redirect the user to the home page
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
