//Thiết lập các kết nối đến database
require('dotenv').config();
const mssql = require('mssql');

const connection =mssql.ConnectionPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;