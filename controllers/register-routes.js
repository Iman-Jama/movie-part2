const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models");

router.get("/register", async (req, res) => {
  return res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

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
