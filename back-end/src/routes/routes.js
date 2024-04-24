const {getAnimes,getAnimeId,getCharacterById, getProducers}= require('../controllers/controllers');
const express = require('express');
const router = express.Router();

router.get('/animes', getAnimes);
router.get('/animes/:animeId', getAnimeId);
router.get('/animes/characters/:animeId', getCharacterById);
router.get('/animes/producers/:animeId', getProducers);
module.exports = router;