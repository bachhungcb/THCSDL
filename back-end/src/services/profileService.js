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
    return result.recordset;
  } catch (err) {
    console.error("Database query error:", err);
    throw new DatabaseQueryError(err, procedure);
  }
};

// Custom error class
class DatabaseQueryError extends Error {
  constructor(originalError, query) {
    super(`Error executing query: ${query}`);
    this.originalError = originalError;
  }
}

const getUserById = async (userId) => {
    console.log(userId);
    const query = ` SELECT * FROM Users
                    WHERE Id = @userId;`;
    const param = [{ name: "userId", value: userId }];

    return executeQuery(query, param);
}

module.exports = {
    getUserById
}