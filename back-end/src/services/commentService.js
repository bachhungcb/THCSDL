const createPool = require(`../config/database`);
const sql = require("mssql");
const {executeProcedure, executeQuery} = require(`../config/procAndQueryConfig.js`);


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