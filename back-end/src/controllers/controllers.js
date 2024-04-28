const {
  getDataForHomepage,
  getAnimeById,
  getCharacterByAnimeId,
  getProducerByAnimeId,
  getAnimeByGenres,
  getAnimeByName,
  getCharacterByName,
  getProducerByName,
} = require("../services/Service");


const getAnimes = async (req, res) => {
  const { page } = req.query;
  const pageValue = parseInt(page);
  const offset = (pageValue - 1) * 50 ;
  const animes = await getDataForHomepage(offset);
  res.status(200).send(animes);
};

const getAnimeId = async (req, res) => {
  const animeId = req.params.animeId;
  const anime = await getAnimeById(animeId);
  res.status(200).send(anime);
};

const getCharacterById = async (req, res) => {
  const animeId = req.params.animeId;
  const characters = await getCharacterByAnimeId(animeId);
  res.status(200).send(characters);
};

const getProducers = async (req, res) => {
  const animeId = req.params.animeId;
  const producers = await getProducerByAnimeId(animeId);
  res.status(200).send(producers);
};

const getAnimeFromGenres = async (req, res) => {
  const anime_genres = req.params.genres;
  const anime = await getAnimeByGenres(anime_genres);
  res.status(200).send(anime);
};
const getAnimeFromName = async (req, res) => {
  const anime_name = req.params.anime_name;
  const anime = await getAnimeByName(anime_name);
  res.status(200).send(anime);
};
const getCharacterFromName = async (req, res) => {
  const character_name = req.params.character_name;
  const character = await getCharacterByName(character_name);
  res.status(200).send(character);
};
const getProducerFromName = async (req, res) => {
  const producers_name = req.params.producer_name;
  const producers = await getProducerByName(producers_name);
  res.status(200).send(producers);
};
//export fuction getAnimes to be used in routes.js
module.exports = {
  getAnimes,
  getAnimeId,
  getCharacterById,
  getProducers,
  getAnimeFromGenres,
  getAnimeFromName,
  getCharacterFromName,
  getProducerFromName,
};
