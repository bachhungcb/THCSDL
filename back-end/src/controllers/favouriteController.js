const express = require("express"); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require("body-parser"); // middleware
const {
  userFavourite,
  getUserFavouriteById,
  unFavouriteById
} = require("../services/favouriteService");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

const postFavourite = async (req, res) => {
  const { userId, animeId } = req.body;
  try {
    const isFavourite = await userFavourite(userId, animeId);
    if (isFavourite.Result === 1) {
      res.status(200).json({ favourite: true }); // OK with JSON response
    } else if (isFavourite.Error === "Duplicate key error") {
      res.status(409).json({ favourite: false, error: "Duplicate entry" }); // Conflict with JSON response
    } else {
      res.status(401).json({ favourite: false }); // Unauthorized with JSON response
    }
  } catch (error) {
    console.error("Favourite error:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error with JSON response
  }
};

const getFavourite = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const favourite = await getUserFavouriteById(userId);
    res.status(200).send(favourite.Recordset);
  } catch (error) {
    console.error("Get favourite error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFavourite = async (req, res) => {
  const { userId, animeId } = req.body;
  try {
    const unfavourite = await unFavouriteById(userId, animeId);
    res.status(200).send({ success: unfavourite.Result });
  } catch (error) {
    console.error("Unfavourite error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  postFavourite,
  getFavourite,
  deleteFavourite
};
