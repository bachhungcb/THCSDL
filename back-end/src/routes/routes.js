//This is controler for getting anime information from database
const {
  getAnimes,
  getAnimeId,
  getCharacterById,
  getProducers,
  getAnimeFromGenres,
  getAnimeFromName,
  getCharacterFromName,
  getProducerFromName,
  getGenres,
  getType,
  getNumberOfAnimeByProducers,
  getProducerByProducersId,
  getCharacterPage
} = require("../controllers/controllers");

//This is controller for getting login information
const{
  postLoginPage
} = require("../controllers/loginController");

//this is controller for getting register information
const{
  postRegisterPage
} = require("../controllers/registerController");

//this is controller for getting profile information
const{
  getUser
} = require("../controllers/profileController");

const {
  postFavourite,
  getFavourite
} = require("../controllers/favouriteController");


const{
  postCommentController
} = require("../controllers/userControllers");

const express = require("express");
const router = express.Router();

router.get("/animes", getAnimes);
router.get("/animes/:animeId", getAnimeId);
router.get("/animes/characters/:animeId", getCharacterById);
router.get("/animes/producers/:animeId", getProducers);
router.get("/animes/genres/:genres", getAnimeFromGenres);
router.get("/animes/names/:anime_name", getAnimeFromName);
router.get("/animes/characters_names/:character_name", getCharacterFromName);
router.get("/animes/producers_names/:producer_name", getProducerFromName);
router.get("/animes/genres_names/:animeId", getGenres);
router.get("/animes/types/:type", getType);
router.get("/producers/anime/:offset", getNumberOfAnimeByProducers);
router.get("/producers/:producers_id", getProducerByProducersId);
router.get("/characters/",getCharacterPage);

router.post("/login", postLoginPage);
router.post("/register", postRegisterPage);

router.get("/profile/:userId", getUser);

router.post("/comment", postCommentController);

router.post("/favourite", postFavourite);
router.get("/favourite/:userId", getFavourite);

module.exports = router;
