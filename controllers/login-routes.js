//Dependencies
const express = require("express");
const passport = require("passport");
const router = express.Router();
const { User } = require("../models");

router.get("/login", async (req, res) => {
  return res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/register",
  })
);

module.exports = router;
