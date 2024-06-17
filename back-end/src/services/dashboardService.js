const sql = require("mssql");
const sqlConfig = require("../config/database");
const createPool = require(`../config/database`);

const executeQuery = async (query, params) => {
  try {
    const pool = await createPool;
    const request = pool.request();
    for (const param of params) {
      request.input(param.name, param.value);
    }
    const result = await request.query(query);
    return { Result: 1, Recordset: result.recordset };
  } catch (error) {
    console.error("Database query error:", error);
    throw new DatabaseQueryError(error, query);
  }
};

const executeProcedure = async (procedure, params) => {
  try {
    const pool = await createPool;
    const request = pool.request();
    for (const param of params) {
      request.input(param.name, param.value);
    }
    const result = await request.execute(procedure);
    return { Result: 1, Recordset: result.recordset };
  } catch (err) {
    console.error("Database query error:", err);
    if (err.number === 2627) {
      return { Result: 0, Error: "Duplicate key error" };
    }
    return { Result: 0, Error: "Database query error" };
  }
};

const getGenres = async () => {
  const query = `SELECT * FROM genres`;
  const result = await executeQuery(query, []);
  return result.Recordset;
};

const insertGenres = async (animeId, genres) => {
  let successCount = 0;
  for (const genre of genres) {
    const query = `INSERT INTO link_genres (anime_id, genres_id)
                       SELECT @anime_id, genres_id FROM genres WHERE genres = @genre`;
    const params = [
      { name: "genre", value: genre },
      { name: "anime_id", value: animeId },
    ];
    try {
      const result = await executeQuery(query, params);
      if (result.Result === 1) {
        // Sử dụng Result để kiểm tra thành công
        successCount += 1;
      }
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Failed to insert genres into database");
    }
  }
  return successCount === genres.length ? 1 : 0;
};

const insertCharacters = async (animeId, Name, Profile, Description, Role) => {
  const procedure = "InsertCharacter";
  const params = [
    { name: "AnimeID", type: sql.Int, value: animeId },
    { name: "Name", type: sql.VarChar(100), value: Name },
    { name: "Profile", value: Profile },
    { name: "Description", value: Description },
    { name: "Roles", type: sql.VarChar(20), value: Role },
  ];
  const result = await executeProcedure(procedure, params);
  if (result.Result === 1) {
    return 1;
  }
};

const deleteAllInfomationByAnimeId = async (animeId) => {
  const procedure = "DeleteAnimeAndRelatedData";
  const params = [{ name: "anime_id", value: animeId }];
  const result = await executeProcedure(procedure, params);
  if (result.Result === 1) {
    return 1;
  }
};
const insertAnimeInformation = async (
  title,
  synopsis,
  age_requirement,
  anime_type,
  episodes,
  animePoster,
  nameUrl,
  scores,
  ranks,
  popularity,
  favourite,
  stat,
  aired_from,
  aired_to,
  premiered
) => {
  const procedure = "InsertAnimeInformation";
  const params = [
    { name: "title", type: sql.VarChar(100), value: title },
    { name: "synopsis", type: sql.VarChar(sql.MAX), value: synopsis },
    { name: "age_requirement", type: sql.VarChar(100), value: age_requirement },
    { name: "anime_type", type: sql.VarChar(10), value: anime_type },
    { name: "episodes", type: sql.VarChar(50), value: episodes },
    { name: "animePoster", type: sql.VarChar(sql.MAX), value: animePoster },
    { name: "nameURL", type: sql.VarChar(sql.MAX), value: nameUrl },
    { name: "scores", type: sql.VarChar(50), value: scores },
    { name: "ranks", type: sql.Int, value: ranks },
    { name: "popularity", type: sql.Int, value: popularity },
    { name: "favourite", type: sql.Int, value: favourite },
    { name: "stat", type: sql.VarChar(20), value: stat },
    { name: "aired_from", type: sql.VarChar(20), value: aired_from },
    { name: "aired_to", type: sql.VarChar(20), value: aired_to },
    { name: "premiered", type: sql.VarChar(20), value: premiered },
  ];

  const result = await executeProcedure(procedure, params);
  if (result && result.Recordset && result.Recordset.length > 0) {
    return { status: 1, animeId: result.Recordset[0].Message };
  } else {
    return { status: 0 };
  }
};

module.exports = {
  getGenres,
  insertGenres,
  insertCharacters,
  insertAnimeInformation,
  deleteAllInfomationByAnimeId,
};
