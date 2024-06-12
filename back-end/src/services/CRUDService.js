const sql = require('mssql');
const sqlConfig = require('../config/database');

const postComment = async (userId, animeId, comment) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool
            .request()
            .input('userId', sql.Int, userId)
            .input('animeId', sql.Int, animeId)
            .input('comment', sql.NVarChar, comment)
            .query(`INSERT INTO Users_comment (user_id, anime_id, comment) VALUES (@userId, @animeId, @comment)`);

        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    postComment,
}