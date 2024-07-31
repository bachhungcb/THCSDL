const sql = require("mssql");
const sqlConfig = require("../config/database");
const {executeProcedure, executeQuery} = require(`../config/procAndQueryConfig.js`);


const getComments = async (animeId) => {
  try{
    const query =     `SELECT c.*, u.FullName, u.Avatar FROM User_comment c 
                      JOIN Users u ON u.Id = c.users_id
                      WHERE c.anime_id = @animeId`;
    return executeQuery(query, [{ name: "animeId", value: animeId }]);
  }catch(err){
    console.log(err);
    throw err;
  }

};

const postComment = async (userId, animeId, comment) => {
  try {

    const userExists = await executeQuery(`SELECT Id FROM Users WHERE Id = @userId`,
                                     [{ name: "userId", value: userId }]);
    console.log(userExists.length);
    if (userExists.length === 0) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const animeExists = await executeQuery(`SELECT anime_id FROM anime WHERE anime_id = @animeId`, 
                                      [{ name: "animeId", value: animeId }]);
    if (animeExists.length === 0) {
      throw new Error(`Anime with ID ${animeId} does not exist.`);
    }
    
    let result = await executeQuery(` INSERT INTO User_comment (users_id, anime_id, comment, added_at) 
                                      VALUES (@userId, @animeId, @comment, @addedAt)`, 
                              [ {name: "userId", value: userId}, 
                                {name: "animeId", value: animeId}, 
                                {name: "comment", value: comment}, 
                                {name: "addedAt", value: new Date()}]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editComment = async (userId, animeId, commentId, comment) => {
  try {
    const result = executeQuery(` UPDATE User_comment SET comment = @comment 
                                  WHERE users_id = @userId AND anime_id = @animeId AND Id = @commentId`,
                                [{name: "userId", value: userId},
                                {name: "animeId", value: animeId},
                                {name: "commentId", value: commentId},
                                {name: "comment", value: comment}]
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteComment = async (userId, animeId, commentId) => {
  try {
    const result = executeQuery(` DELETE FROM User_comment 
                                  WHERE users_id = @userId 
                                  AND anime_id = @animeId 
                                  AND Id = @commentId`,
                                  [ {name: "userId", value: userId},
                                    {name: "animeId", value: animeId},
                                    {name: "commentId", value: commentId}        
    ]);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getCommentsForCharacter = async (characterId) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().input("characterId", sql.Int, characterId)
      .query(`SELECT c.*, u.FullName, u.Avatar FROM User_comment_character c 
              JOIN Users u ON u.Id = c.users_id
              WHERE c.character_id = @characterId`);

    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const postCommentForCharacter = async (userId, characterId, comment) => {
  try {
    let pool = await sql.connect(sqlConfig);

    const userExists = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("SELECT Id FROM Users WHERE Id = @userId");

    if (userExists.recordset.length === 0) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const characterExists = await pool
      .request()
      .input("characterId", sql.Int, characterId)
      .query("SELECT Id FROM new_character WHERE Id = @characterId");

    if (characterExists.recordset.length === 0) {
      throw new Error(`Character with ID ${characterId} does not exist.`);
    }

    // Proceed with inserting comment
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("characterId", sql.Int, characterId)
      .input("comment", sql.NVarChar, comment)
      .input("addedAt", sql.Date, new Date())
      .query(`INSERT INTO User_comment_character (users_id, character_id, comment, added_at) 
              VALUES (@userId, @characterId, @comment, @addedAt)`);

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const editCommentForCharacter = async (userId, characterId, commentId, comment) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("characterId", sql.Int, characterId)
      .input("commentId", sql.Int, commentId)
      .input("comment", sql.NVarChar, comment)
      .query(
        `UPDATE User_comment_character SET comment = @comment 
         WHERE users_id = @userId AND character_id = @characterId AND Id = @commentId`
      );

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteCommentForCharacter = async (userId, characterId, commentId) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("characterId", sql.Int, characterId)
      .input("commentId", sql.Int, commentId)
      .query(
        `DELETE FROM User_comment_character 
         WHERE users_id = @userId AND character_id = @characterId AND Id = @commentId`
      );

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserList = async () => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT * FROM Users WHERE Role <> 'admin'`);

    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const banUser = async (userId) => {
  const procedure = 'banned';
  const params = [
    { name: 'user_id', value: userId },
  ];
  return executeProcedure(procedure, params);
};

const unbanUser = async (userId) => {
  const procedure = 'unban';
  const params = [
    { name: 'user_id', value: userId },
  ];
  return executeProcedure(procedure, params);
};

module.exports = {
  getComments,
  postComment,
  editComment,
  deleteComment,
  getCommentsForCharacter,
  postCommentForCharacter,
  editCommentForCharacter,
  deleteCommentForCharacter,
  getUserList,
  banUser,
  unbanUser
};
