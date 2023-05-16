const express = require("express");
const passport = require("passport");
const router = express.Router();

//uses a get method to get the login views and if login is successful it redirects to dashboard
//if it fails it sends them to register
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
