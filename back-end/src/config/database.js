//Thiết lập các kết nối đến database
require("dotenv").config();
const { request } = require("express");
const sql = require("mssql");

var dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  options: {
    encrypt: false,
    trustedConnection: true,
    instancename: process.env.DB_INSTANCE,
    requestTimeout: 60000,
  },
 
};

async function createPool() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Connected to database");
    return pool;
  } catch (error) {
    console.error("Failed to connect:", error);
    throw error; // Ném lỗi để báo lỗi cho phần gọi
  }
}

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
//export config to use in other files
module.exports = createPool();
