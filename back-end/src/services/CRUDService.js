const sql = require("mssql");
const sqlConfig = require("../config/database");

const getComments = async (animeId) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().input("animeId", sql.Int, animeId)
      .query(`SELECT c.*, u.FullName FROM User_comment c 
                    JOIN Users u ON u.Id = c.users_id
                    WHERE c.anime_id = @animeId`);

    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const postComment = async (userId, animeId, comment) => {
  try {
    let pool = await sql.connect(sqlConfig);

    // Check if userId exists in Users table
    const userExists = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("SELECT Id FROM Users WHERE Id = @userId");

    if (userExists.recordset.length === 0) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    // Check if animeId exists in anime table
    const animeExists = await pool
      .request()
      .input("animeId", sql.Int, animeId)
      .query("SELECT anime_id FROM anime WHERE anime_id = @animeId");

    if (animeExists.recordset.length === 0) {
      throw new Error(`Anime with ID ${animeId} does not exist.`);
    }

    // Proceed with inserting comment
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("animeId", sql.Int, animeId)
      .input("comment", sql.NVarChar, comment)
      .input("addedAt", sql.Date, new Date())
      .query(`INSERT INTO User_comment (users_id, anime_id, comment, added_at) 
                    VALUES (@userId, @animeId, @comment, @addedAt)`);

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editComment = async (userId, animeId, commentId, comment) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("animeId", sql.Int, animeId)
      .input("commentId", sql.Int, commentId)
      .input("comment", sql.NVarChar, comment)
      .query(
        `UPDATE User_comment SET comment = @comment WHERE users_id = @userId AND anime_id = @animeId AND Id = @commentId`
      );

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const deleteComment = async (userId, animeId, commentId) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("animeId", sql.Int, animeId)
      .input("commentId", sql.Int, commentId)
      .query(
        `DELETE FROM User_comment WHERE users_id = @userId AND anime_id = @animeId AND Id = @commentId`
      );

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
module.exports = {
  getComments,
  postComment,
  editComment,
  deleteComment,
};
