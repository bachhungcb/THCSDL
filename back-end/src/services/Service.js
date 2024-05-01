const createPool = require(`../config/database`);

//get animes for homepage, display 50 animes per page
const getDataForHomepage = async (offset) => {
  try {
    const pool = await createPool;
    const animeResult = await pool
      .request()
      .input(`offset`, offset)
      .query(
        `SELECT TOP (50) a.*, s.stat
    FROM anime a
    LEFT JOIN anime_status s ON a.anime_id = s.anime_id
    WHERE a.anime_id NOT IN (
        SELECT TOP (@offset) anime_id 
        FROM anime 
        ORDER BY anime_id
    )
    ORDER BY a.anime_id;
    `
      );
    const animeData = animeResult.recordset;
    return animeData;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};

const getAnimeById = async (animeId) => {
  try {
    const pool = await createPool;
    const animeResult = await pool
      .request()
      .input(`anime_id`, animeId)
      .query(
        `SELECT anime.title, informations.scores, informations.ranks, anime.episodes, anime.synopsis, anime_status.aired_from,anime_status.aired_to,anime.animePoster, informations.favourite, informations.popularity 
        FROM anime 
        JOIN informations ON informations.anime_id = anime.anime_id 
        JOIN anime_status ON anime_status.anime_id = anime.anime_id 
        WHERE anime.anime_id = @anime_id;`
      );
    return animeResult.recordset;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};

const getCharacterByAnimeId = async (animeId) => {
  const pool = await createPool;
  const characterResult = await pool.request().input("anime_id", animeId)
    .query(`SELECT * 
      FROM characters 
      WHERE anime_id = @anime_id`);
  return characterResult.recordset;
};

const getProducerByAnimeId = async (animeId) => {
  const pool = await createPool;
  const producersResults = await pool
    .request()
    .input(`anime_id`, animeId)
    .query(
      `SELECT producers.producers_id AS Id, producers.producers_name AS producers 
      FROM producers 
      JOIN anime_producers ON anime_producers.producers_id = producers.producers_id 
      JOIN anime ON anime.anime_id = anime_producers.anime_id 
      WHERE anime.anime_id = @anime_id`
    );
  return producersResults.recordset;
};

const getAnimeByGenres = async (anime_genres) => {
  try {
    const pool = await createPool;
    const animeResult = await pool
      .request()
      .input(`anime_genres`, anime_genres)
      .query(
        `SELECT TOP 10 anime.title, anime.genres 
        FROM anime 
        JOIN informations ON informations.anime_id = anime.anime_id 
        WHERE anime.genres LIKE '%'+@anime_genres+'%' 
        ORDER BY informations.scores DESC;`
      );
    return animeResult.recordset;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};

const getAnimeByName = async (anime_name) => {
  try {
    const pool = await createPool;
    const animeResult = await pool
      .request()
      .input('anime_name', anime_name)
      .query(
        `SELECT anime.title, informations.scores, informations.ranks, anime.episodes, anime.synopsis, anime_status.aired_from,anime_status.aired_to, informations.favourite, informations.popularity
        FROM anime WITH (INDEX(idx_title))
        INNER JOIN informations ON informations.anime_id = anime.anime_id
        INNER JOIN anime_status ON anime_status.anime_id = anime.anime_id
        WHERE anime.title LIKE '%'+@anime_name+'%'`
      );
    return animeResult.recordset;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};
const getCharacterByName = async (character_name) => {
  try {
    const pool = await createPool;
    const characterResult = await pool
      .request()
      .input('character_name', character_name)
      .query(
        `SELECT DISTINCT TOP 10 characters.names, characters.characterProfile
        FROM characters WITH (INDEX(ix_characters_name))      
        WHERE characters.names LIKE '%'+@character_name+'%'
        ORDER BY characters.names ;`
      );
    return characterResult.recordset;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};
//sua cho dang sau Index thanh ten index cua minh
const getProducerByName = async (producers_name) => {
  try {
    const pool = await createPool;
    const producerResult = await pool
      .request()
      .input('producers_name', producers_name)
      .query(
        `SELECT *
        FROM producers
        WHERE producers.producers_name LIKE '%'+@producers_name+'%'
        ORDER BY producers.producers_id;`
      );
    return producerResult.recordset;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};

module.exports = {
  getDataForHomepage,
  getAnimeById,
  getCharacterByAnimeId,
  getProducerByAnimeId,
  getAnimeByGenres,
  getAnimeByName,
  getCharacterByName,
  getProducerByName,
};
