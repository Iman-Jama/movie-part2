const app = require("../server.js");
const router = require("express").Router();

router.get("/", async (req, res) => {
  return res.render("home", { title: "Homepage" });
});

router.get("/user/:num", async (req, res) => {
  return res.render("user", users[req.params.num - 1]);
});

router.get("/login", async (req, res) => {
  return res.render("login", { title: "login" });
});

router.get("/register", async (req, res) => {
  return res.render("register", { title: "Register" });
});

module.exports = router;
