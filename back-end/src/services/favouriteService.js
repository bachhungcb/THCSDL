const createPool = require(`../config/database`);
const sql = require("mssql");

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

//Common function to execute stored procedures
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
      // Primary Key Violation error number
      return { Result: 0, Error: "Duplicate key error" };
    }
    return { Result: 0, Error: "Database query error" };
  }
};

// Custom error class
class DatabaseQueryError extends Error {
  constructor(originalError, query) {
    super(`Error executing query: ${query}`);
    this.originalError = originalError;
  }
}

const userFavourite = async (userId, animeId) => {
  const procedure = "userFavourite";
  const params = [
    { name: "user_id", value: userId },
    { name: "anime_id", value: animeId },
  ];

  const result = await executeProcedure(procedure, params);
  return result;
};

const getUserFavouriteById = async (userId) => {
  const query = ` SELECT * FROM anime a
                  JOIN User_favourites u ON a.anime_id = u.anime_id
                  WHERE u.users_id= @userId;`;
  const param = [{ name: "userId", value: userId }];

  return executeQuery(query, param);
}
const unFavouriteById = async(userId)=>{
  const query = 'UPDATE User_favourites SET is_favourite = 0 WHERE users_id = @userId';
  const param = [{ name: 'userId', value: userId }];
  return executeQuery(query, param);
}
module.exports = {
  userFavourite,
  getUserFavouriteById,
  unFavouriteById
};
