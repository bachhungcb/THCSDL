const createPool = require(`../config/database`);

//get animes for homepage, display 50 animes per page
const getDataForHomepage = async (offset) => {
  try {
    const pool = await createPool;
    const animeResult = await pool
      .request()
      .input(`offset`, offset)
      .query(
        `SELECT TOP (50) a.*, s.stat, i.scores, i.ranks, i.favourite, i.popularity, s.aired_from, s.aired_to, s.premiered
        FROM anime a
        LEFT JOIN anime_status s ON a.anime_id = s.anime_id
        LEFT JOIN informations i ON a.anime_id = i.anime_id
        WHERE a.anime_id NOT IN (
            SELECT TOP (@offset) anime_id 
            FROM anime 
            ORDER BY anime_id
        )
        ORDER BY a.anime_id;`
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
        `SELECT anime.title,anime.anime_type, informations.scores, informations.ranks, anime.episodes,
                anime.synopsis, anime_status.aired_from, anime_status.stat,
                anime_status.aired_to, anime_status.premiered, anime.animePoster, informations.favourite, 
                informations.popularity
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
  try {
    const pool = await createPool;
    const characterResult = await pool.request().input("anime_id", animeId)
      .query(`SELECT * 
        FROM new_character 
        JOIN link_character ON link_character.character_id = new_character.Id
        WHERE link_character.anime_id = @anime_id`);
    return characterResult.recordset;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};

const getProducerByAnimeId = async (animeId) => {
  try {
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
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};

const getAnimeByGenres = async (anime_genres) => {
  try {
    const pool = await createPool;
    const animeResult = await pool
      .request()
      .input(`anime_genres`, anime_genres)
      .query(
        `SELECT DISTINCT TOP 10 anime.title, genres.genres, informations.scores
        FROM anime 
        JOIN informations ON informations.anime_id = anime.anime_id 
        JOIN link_genres ON link_genres.anime_id = anime.anime_id
        JOIN genres ON genres.genres_id = link_genres.genres_id
        WHERE genres.genres LIKE '%' + @anime_genres + '%' 
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
      .input("anime_name", anime_name)
      .query(
        `SELECT anime.title, informations.scores, informations.ranks, anime.episodes, anime.synopsis, 
        anime_status.aired_from, anime_status.aired_to, informations.favourite, informations.popularity
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
      .input("character_name", character_name)
      .query(
        `SELECT DISTINCT TOP 10 new_character.Name, new_character.Profile
        FROM new_character  
        WHERE new_character.Name LIKE '%' + @character_name + '%'
        ORDER BY new_character.Name;`
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
      .input("producers_name", producers_name)
      .query(
        `SELECT producers.producers_name, producers.producers_id
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
const getGenresByAnimeId = async (animeId) => {
  try {
    const pool = await createPool;
    const genresResult = await pool
      .request()
      .input("anime_id", animeId)
      .query(
        `SELECT genres.genres_id, genres.genres
        FROM genres
        JOIN link_genres ON link_genres.genres_id = genres.genres_id
        JOIN anime ON anime.anime_id = link_genres.anime_id
        WHERE anime.anime_id = @anime_id`
      );
    return genresResult.recordset;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }

}

module.exports = {
  getDataForHomepage,
  getAnimeById,
  getCharacterByAnimeId,
  getProducerByAnimeId,
  getAnimeByGenres,
  getAnimeByName,
  getCharacterByName,
  getProducerByName,
  getGenresByAnimeId
};
