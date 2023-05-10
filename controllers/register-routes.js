const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models");
const saltRounds = 10;

router.get("/register", async (req, res) => {
  return res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new user with the provided details and hashed password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
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
