const createPool = require(`../config/database`);
const sql = require("mssql");
const {executeProcedure, executeQuery} = require(`../config/procAndQueryConfig.js`);


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
  return executeQuery(query, [{ name: "offset", value: offset }]);
};

const getAnimeById = async (animeId) => {
  const procedure = "AnimeInformation";
  const params = [{ name: "anime_id", value: animeId }];
  return executeProcedure(procedure, params);
};

const getAnimeByType = async (offset, animeType) => {
  const procedure = "getAnimeByType";
  const params = [
    { name: "offset", value: parseInt(offset) },
    { name: "anime_type", value: animeType },
  ];
  return executeProcedure(procedure, params);
};

const getCharacterByAnimeId = async (animeId) => {
  const query = `SELECT n.*, l.Roles 
                FROM new_character n 
                JOIN link_character l ON l.character_id = n.Id
                WHERE l.anime_id = @anime_id`;
  return executeQuery(query, [{ name: "anime_id", value: animeId }]);
};

const getProducerByAnimeId = async (animeId) => {
  const procedure = "getProducerByAnimeId";
  const params = [{ name: "anime_id", value: animeId }];
  return executeProcedure(procedure, params);
};

const getAnimeByGenres = async (anime_genres) => {
  const query = `SELECT DISTINCT TOP 10 anime.* , informations.scores, genres.*
                FROM anime 
                JOIN informations ON informations.anime_id = anime.anime_id 
                JOIN link_genres ON link_genres.anime_id = anime.anime_id
                JOIN genres ON genres.genres_id = link_genres.genres_id
                WHERE genres.genres LIKE '%' + @anime_genres + '%' 
                ORDER BY informations.scores DESC;`;
  return executeQuery(query, [{ name: "anime_genres", value: anime_genres }]);
};

const getAnimeByName = async (anime_name) => {
  const query = `SELECT anime.anime_id, anime.title, informations.scores, informations.ranks, anime.episodes, anime.animePoster,
                  anime.synopsis, anime_status.aired_from,anime_status.aired_to, informations.favourite,
                  informations.popularity, anime_status.stat, anime_status.premiered, anime.anime_type
                  FROM anime
                  JOIN informations ON informations.anime_id = anime.anime_id
                  JOIN anime_status ON anime_status.anime_id = anime.anime_id
                WHERE anime.title LIKE '%'+@anime_name+'%'`;
  return executeQuery(query, [{ name: "anime_name", value: anime_name }]);
  
};

const getCharacterByName = async (character_name) => {
  const query = `SELECT DISTINCT TOP 10 *
  FROM new_character  
  WHERE new_character.Name LIKE '%' + @character_name + '%'
  ORDER BY new_character.Name;`;
  return executeQuery(query, [
    { name: "character_name", value: character_name },
  ]);
};

const getCharacterByCharacterId = async (characterId) => {
  const query = `SELECT DISTINCT new_character.*
  FROM new_character
  JOIN link_character ON link_character.character_id = new_character.Id
  WHERE new_character.Id = @characterId`;
  return executeQuery(query, [{ name: "characterId", value: characterId }]);

}
const getAnimeByCharacterId = async (characterId) => {
  const query = `SELECT anime.*
  FROM anime
  JOIN link_character ON link_character.anime_id = anime.anime_id
  WHERE link_character.character_id = @characterId`;
  return executeQuery(query, [{ name: "characterId", value: characterId }]);

}

const getDataCharacterPage = async (offset) => {
  const query = `SELECT TOP 50 new_character.Name, new_character.Profile, new_character.Id
  FROM new_character
  WHERE new_character.Id NOT IN (
      SELECT TOP (@offset) Id 
      FROM new_character 
      ORDER BY Id
  )
  ORDER BY new_character.Id;`;
  return executeQuery(query, [{ name: "offset", value: offset }]);
};

const getProducerByName = async (producers_name) => {
  const query = `SELECT producers.producers_name, producers.producers_id
  FROM producers
  WHERE producers.producers_name LIKE '%'+@producers_name+'%'
  ORDER BY producers.producers_id;`;
  return executeQuery(query, [
    { name: "producers_name", value: producers_name },
  ]);
};

const getGenresByAnimeId = async (animeId) => {
  const query = `SELECT genres.genres_id, genres.genres
  FROM genres
  JOIN link_genres ON link_genres.genres_id = genres.genres_id
  JOIN anime ON anime.anime_id = link_genres.anime_id
  WHERE anime.anime_id = @anime_id`;
  return executeQuery(query, [{ name: "anime_id", value: animeId }]);
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
  FETCH NEXT 50 ROWS ONLY;`;
  return executeQuery(query, [{ name: "offset", value: offset }]);
};

const ProducersById = async (producers_id) => {
  const query = `SELECT producers.producers_name, producers.producers_id
  FROM producers
  WHERE producers.producers_id = @producers_id`;
  return executeQuery(query, [{ name: "producers_id", value: producers_id }]);
};

const getRoleByCharacterId = async (characterId) => {
  const query = `SELECT l.Roles, a.title, a.anime_id
  FROM link_character l
  JOIN anime a ON l.anime_id = a.anime_id
  WHERE l.character_id = @characterId`;
  return executeQuery(query, [{ name: "characterId", value: characterId }]);
};

const getRandomGenre = async () => {
  const query = `SELECT TOP 1 genres.genres
  FROM genres
  ORDER BY NEWID();`;
  const result = await executeQuery(query, []);
  return result[0]?.genres; 
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
  getCharacterByCharacterId,
  getAnimeByCharacterId,
  getRoleByCharacterId,
  getRandomGenre,
};
