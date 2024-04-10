const { getAll } = require("../services/CRUDService");

const getAnimes = async (req, res) => {
  const animes = await getAll();
  res.status(200).send(animes);
};
//export fuction getAnimes to be used in routes.js
module.exports = { getAnimes };
