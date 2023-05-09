const app = require("../server.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

router.get("/", async (req, res) => {
  return res.render("home");
});

router.get("/user/:num", async (req, res) => {
  return res.render("user", users[req.params.num - 1]);
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
