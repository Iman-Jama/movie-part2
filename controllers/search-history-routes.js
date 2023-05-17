const express = require("express");
const router = express.Router();
const { SearchHistory } = require("../models");

router.get("/search-history", async (req, res) => {
  try {
    const userID = req.user.user_id;

    // This is used to fetch the search history records for the logged-in user
    const searchHistory = await SearchHistory.findAll({
      where: { user_id: userID },
      order: [["search_date", "DESC"]],
    });
    //this then converts it to a json in order for it to be displayed.
    res.json(searchHistory);
  } catch (error) {
    //this handles an error
    console.error("Error retrieving search history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
