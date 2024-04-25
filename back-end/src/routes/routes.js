const {getAnimes,getAnimeId,getCharacterById, getProducers, getAnimeFromGenres}= require('../controllers/controllers');
const express = require('express');
const router = express.Router();

router.get('/animes', getAnimes);
router.get('/animes/:animeId', getAnimeId);
router.get('/animes/characters/:animeId', getCharacterById);
router.get('/animes/producers/:animeId', getProducers);
router.get('/animes/genres/:animeGenres', getAnimeFromGenres);
module.exports = router;