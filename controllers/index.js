const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// Direct users to static files
// This needs to go through the handlebars
router.get("/", async (req, res) => {
  res.sendFile("./index.html");
});

module.exports = router;
