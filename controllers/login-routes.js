//using the dependencies express, passport and express.router
const express = require("express");
const passport = require("passport");
const router = express.Router();

//Uses a get method to get the login views, if login is successful it redirects to dashboard
//if it fails it sends them to register
router.get("/login", async (req, res) => {
  return res.render("login");
});

router.post(
  "/login",
  //we are using the built in method of authenticte in passport to do this
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/register",
  })
);

module.exports = router;
