const app = require("../server.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

router.get("/", async (req, res) => {
  return res.render("home");
});

router.get("/dashboard", async (req, res) => {
  return res.render("dashboard");
});

module.exports = router;
