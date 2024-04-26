const {
  getDataForHomepage,
  getAnimeById,
  getCharacterByAnimeId,
  getProducerByAnimeId,
  getAnimeByGenres,
  getAnimeByName
} = require("../services/Service");

const getAnimes = async (req, res) => {
  const animes = await getDataForHomepage();
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
  const anime_genres = req.params.animeGenres;
  const anime = await getAnimeByGenres(anime_genres);
  res.status(200).send(anime);
};
const getAnimeFromName = async (req, res) => {
  const anime_name = req.params.animeName;
  const anime = await getAnimeByName(anime_name);
  res.status(200).send(anime);
};

//export fuction getAnimes to be used in routes.js
module.exports = { getAnimes, getAnimeId, getCharacterById, getProducers, getAnimeFromGenres, getAnimeFromName};
