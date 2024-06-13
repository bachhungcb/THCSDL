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

//return 1 if can update user comment, 0 if cannot
const updateUserComment = async (userId, animeId, comment) => {
    const procedure = "updateUserComment";
    const params = [
        { name: "user_id", value: userId },
        { name: "anime_id", value: animeId },
        { name: "comment", value: comment }
    ];
    return executeProcedure(procedure, params);
};

module.exports ={
    updateUserComment
}