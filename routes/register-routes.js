const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models");

router.get("/", (req, res) => {
  res.render("/register.handlebars");
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the provided details
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Redirect the user to the login page
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
