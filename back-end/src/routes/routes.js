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
  getCharacterPage,
  getCharacterDetail,
  getAnimeByCharacter,
  getRoleByCharacter,
  getRandomAnimeByGenre 
} = require("../controllers/controllers");

//This is controller for getting login information
const { postLoginPage } = require("../controllers/loginController");

//this is controller for getting register information
const { postRegisterPage } = require("../controllers/registerController");

//this is controller for getting profile information
const {
  getUser,
  changeAvatarController,
  changeBirthdayController,
  changeFullNameController,
  changePasswordController
} = require("../controllers/profileController");

const {
  postFavourite,
  getFavourite,
  deleteFavourite,
  postFavouriteCharacter,
  getFavouriteCharacter,
  deleteFavouriteCharacter
} = require("../controllers/favouriteController");

const {
  getCommentsController,
  postCommentController,
  editCommentController,
  deleteCommentController,
  postCommentForCharacterController,
  getCommentsForCharacterController,
  editCommentForCharacterController,
  deleteCommentForCharacterController,
  getUserListController,
  banUserController,
  unbanUserController
} = require("../controllers/userControllers");

const express = require("express");
const router = express.Router();

//This is the route for getting anime information
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
router.get("/characters/", getCharacterPage);
router.get("/characters/:characterId", getCharacterDetail);
router.get("/characters/anime/:characterId", getAnimeByCharacter);
router.get("/characters/role/:characterId", getRoleByCharacter);
router.get("/random/animes", getRandomAnimeByGenre);

//This is the route for getting login and register information
router.post("/login", postLoginPage);
router.post("/register", postRegisterPage);


//This is the route for getting profile information
router.get("/profile/:userId", getUser);
router.put("/profile/avatar", changeAvatarController);
router.put("/profile/birthday", changeBirthdayController);
router.put("/profile/fullname", changeFullNameController);
router.put("/profile/password", changePasswordController);

//This is the route for getting favourite information
router.post("/favourite", postFavourite);
router.get("/favourite/:userId", getFavourite);
router.delete("/unfavourite", deleteFavourite);
router.post("/favourite/characters", postFavouriteCharacter);
router.get("/favourite/characters/:userId", getFavouriteCharacter);
router.delete("/unfavourite/characters", deleteFavouriteCharacter);


//This is the route for CRUD APIs
router.get("/comments/animes/:animeId", getCommentsController);
router.post("/comments/animes", postCommentController);
router.put("/comments/animes", editCommentController);
router.delete("/comments/animes", deleteCommentController);
router.get("/comments/characters/:characterId", getCommentsForCharacterController);
router.post("/comments/characters", postCommentForCharacterController);
router.put("/comments/characters", editCommentForCharacterController);
router.delete("/comments/characters", deleteCommentForCharacterController);
router.get("/users", getUserListController);
router.put("/ban", banUserController);
router.put("/unban", unbanUserController);

module.exports = router;
