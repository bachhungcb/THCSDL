const createPool = require(`../config/database`);
const sql = require('mssql')

// Common function to execute queries
const executeQuery = async (query, params) => {
  try {
    const pool = await createPool;
    const request = pool.request();
    for (const param of params) {
      request.input(param.name, param.value);
    }
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error("Database query error:", error);
    throw new DatabaseQueryError(error, query);
  }
};

// Custom error class
class DatabaseQueryError extends Error {
  constructor(originalError, query) {
    super(`Error executing query: ${query}`);
    this.originalError = originalError;
  }
}

//get animes for homepage, display 50 animes per page
const getDataForHomepage = async (offset) => {

  const query = `SELECT TOP (50) a.*, s.stat, i.scores, i.ranks, i.favourite, i.popularity, s.aired_from, s.aired_to, s.premiered
  FROM anime a
  LEFT JOIN anime_status s ON a.anime_id = s.anime_id
  LEFT JOIN informations i ON a.anime_id = i.anime_id
  WHERE a.anime_id NOT IN (
      SELECT TOP (@offset) anime_id 
      FROM anime 
      ORDER BY anime_id
  )
  ORDER BY a.anime_id;`;
  return executeQuery(query, [{ name: 'offset', value: offset }]);
};

const getAnimeById = async (animeId) => {
try{
  let pool = await createPool;
  let result = 
  await pool.request()
            .input('anime_id', sql.Int, animeId)
            .execute('AnimeInformation');
  return result.recordset;
}
catch(err){
  console.log(err);
}
};

const getAnimeByType = async (offset, animeType) => {

  const query = `SELECT TOP (50) a.*, s.stat, i.scores, i.ranks, i.favourite, i.popularity, s.aired_from, s.aired_to, s.premiered
                FROM anime a
                LEFT JOIN anime_status s ON a.anime_id = s.anime_id
                LEFT JOIN informations i ON a.anime_id = i.anime_id
                WHERE a.anime_id NOT IN (
                SELECT TOP (@offset) anime_id 
                FROM anime 
                ORDER BY anime_id
                )
                AND a.anime_type = @animeType
                ORDER BY a.anime_id;`
  return executeQuery(query, [{ name: 'offset', value: parseInt(offset)},
                              { name: 'animeType', value: animeType}])
};

const getCharacterByAnimeId = async (animeId) => {

  const query = `SELECT * 
                FROM new_character 
                JOIN link_character ON link_character.character_id = new_character.Id
                WHERE link_character.anime_id = @anime_id`; 
  return executeQuery(query, [{ name: 'anime_id', value: animeId }]);
};

const getProducerByAnimeId = async (animeId) => {
  
  const query = `SELECT producers.producers_id AS Id, producers.producers_name AS producers 
                FROM producers 
                JOIN anime_producers ON anime_producers.producers_id = producers.producers_id 
                JOIN anime ON anime.anime_id = anime_producers.anime_id 
                WHERE anime.anime_id = @anime_id`
  return executeQuery(query, [{ name: 'anime_id', value: animeId }]);
};

const getAnimeByGenres = async (anime_genres) => {

  const query = `SELECT DISTINCT TOP 10 anime.title, genres.genres, informations.scores
                FROM anime 
                JOIN informations ON informations.anime_id = anime.anime_id 
                JOIN link_genres ON link_genres.anime_id = anime.anime_id
                JOIN genres ON genres.genres_id = link_genres.genres_id
                WHERE genres.genres LIKE '%' + @anime_genres + '%' 
                ORDER BY informations.scores DESC;`
  return executeQuery(query, [{ name: 'anime_genres', value: anime_genres }]);
};

const getAnimeByName = async (anime_name) => {

  const query = `SELECT anime.title, informations.scores, informations.ranks, anime.episodes, anime.synopsis, 
                anime_status.aired_from, anime_status.aired_to, informations.favourite, informations.popularity
                FROM anime WITH (INDEX(idx_title))
                INNER JOIN informations ON informations.anime_id = anime.anime_id
                INNER JOIN anime_status ON anime_status.anime_id = anime.anime_id
                WHERE anime.title LIKE '%'+@anime_name+'%'`
  return executeQuery(query, [{ name: 'anime_name', value: anime_name }]);
};


const getCharacterByName = async (character_name) => {

  const query = `SELECT DISTINCT TOP 10 new_character.Name, new_character.Profile
  FROM new_character  
  WHERE new_character.Name LIKE '%' + @character_name + '%'
  ORDER BY new_character.Name;`
  return executeQuery(query, [{ name: 'character_name', value: character_name }]);
};

const getDataCharacterPage = async (offset) => {

  const query = `SELECT TOP 50 new_character.Name, new_character.Profile
  FROM new_character
  WHERE new_character.Id NOT IN (
      SELECT TOP (@offset) Id 
      FROM new_character 
      ORDER BY Id
  )
  ORDER BY new_character.Name;`
  return executeQuery(query, [{ name: 'offset', value: offset }]);
};


const getProducerByName = async (producers_name) => {

  const query = `SELECT producers.producers_name, producers.producers_id
  FROM producers
  WHERE producers.producers_name LIKE '%'+@producers_name+'%'
  ORDER BY producers.producers_id;`;
  return executeQuery(query, [{ name: 'producers_name', value: producers_name }]);
};

const getGenresByAnimeId = async (animeId) => {

  const query =  `SELECT genres.genres_id, genres.genres
  FROM genres
  JOIN link_genres ON link_genres.genres_id = genres.genres_id
  JOIN anime ON anime.anime_id = link_genres.anime_id
  WHERE anime.anime_id = @anime_id`
  return executeQuery(query, [{ name: 'anime_id', value: animeId }]);
};

const getNumberOfAnime = async (offset = 0) => {

  const query = `SELECT producers.producers_name, SUM(anime.anime_id) AS Total_Anime 
  FROM informations
  JOIN anime ON anime.anime_id = informations.anime_id
  JOIN anime_producers ON anime_producers.anime_id = anime.anime_id
  JOIN producers ON producers.producers_id = anime_producers.producers_id
  GROUP BY producers.producers_name
  ORDER BY AVG(CONVERT(DECIMAL,informations.scores)) DESC
  OFFSET (@offset) ROWS
  FETCH NEXT 50 ROWS ONLY;`
  return executeQuery(query, [{ name: 'offset', value: offset }]);

};

const ProducersById = async (producers_id) => {

  const query = `SELECT producers.producers_name, producers.producers_id
  FROM producers
  WHERE producers.producers_id = @producers_id`
  return executeQuery(query, [{ name: 'producers_id', value: producers_id }]);
};

module.exports = {
  getDataForHomepage,
  getAnimeById,
  getAnimeByType,
  getCharacterByAnimeId,
  getProducerByAnimeId,
  getAnimeByGenres,
  getAnimeByName,
  getCharacterByName,
  getProducerByName,
  getGenresByAnimeId,
  getNumberOfAnime,
  ProducersById,
  getDataCharacterPage,
};
