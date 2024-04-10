//Thiết lập các kết nối đến database
require('dotenv').config();
const sql = require("mssql");

var dbConfig={
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    options: {
        encrypt: false,
        trustedConnection: true,
        instancename: process.env.DB_INSTANCE,
    },
};

async function createPool() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to database');
        return pool;
    } catch (error) {
        console.error('Failed to connect:', error);
        throw error; // Ném lỗi để báo lỗi cho phần gọi
    }
}
//export config to use in other files
module.exports = createPool();