const createPool = require("../config/database");

//get animes for homepage
const getDataForHomepage = async () => {
  try {
    const pool = await createPool;
    const animeResult = await pool.request().query("SELECT * FROM anime");
    const animeStatusResult = await pool
      .request()
      .query("SELECT * FROM anime_status");
    const animeData = animeResult.recordset;
    const animeStatusData = animeStatusResult.recordset;
    //combine the two results for the front-end
    const combinedData = animeData.map((anime) => {
      const correspondingStatus = animeStatusData.find(
        (stat) => stat.anime_id === anime.anime_id
      );
      return {
        ...anime,
        stat: correspondingStatus ? correspondingStatus.stat : null,
      };
    });
    return combinedData;
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
      .input("anime_id", animeId)
      .query("SELECT * FROM anime WHERE anime_id = @anime_id");
    const animeStatusResult = await pool
      .request()
      .input("anime_id", animeId)
      .query("SELECT * FROM anime_status WHERE anime_id = @anime_id");
    const animeStatisticResult = await pool
      .request()
      .input("anime_id", animeId)
      .query("SELECT * FROM informations WHERE anime_id = @anime_id");
    const animeData = animeResult.recordset[0]; // Assuming there's only one record for each anime_id
    const animeStatusData = animeStatusResult.recordset[0];
    const animeStatisticData = animeStatisticResult.recordset[0];

    // Combine data from all tables into a single object
    const combinedData = {
      animeData: animeData,
      animeStatusData: animeStatusData,
      animeStatisticData: animeStatisticData,
    };
    return combinedData;
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    throw error;
  }
};

const getCharacterByAnimeId = async (animeId) => {
    const pool = await createPool;
    const characterResult = await pool
      .request()
      .input("anime_id", animeId)
      .query("SELECT * FROM characters WHERE anime_id = @anime_id");
    return characterResult.recordset;
}

const getProducerByAnimeId = async (animeId) => {
  const pool = await createPool;
  const producersResults = await pool
    .request()
    .input("anime_id", animeId)
    .query('SELECT producers.producers_id AS Id, producers.producers_name AS producers FROM producers JOIN anime_producers ON anime_producers.producers_id = producers.producers_id JOIN anime ON anime.anime_id = anime_producers.anime_id WHERE anime.anime_id = @anime_id');
  return producersResults.recordset;
}


module.exports = {
  getDataForHomepage,
  getAnimeById,
  getCharacterByAnimeId,
  getProducerByAnimeId
};
