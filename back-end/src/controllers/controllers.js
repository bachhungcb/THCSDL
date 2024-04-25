const {
  getDataForHomepage,
  getAnimeById,
  getCharacterByAnimeId,
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
//export fuction getAnimes to be used in routes.js
module.exports = { getAnimes, getAnimeId, getCharacterById };
