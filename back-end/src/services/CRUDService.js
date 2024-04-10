const createPool = require("../config/database");

//get all animes
const getAll = async () => {
    try {
        const pool = await createPool;
        const result = await pool.request().query("SELECT * FROM Anime");
        return result.recordset;
    } catch (error) {
        console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
        throw error;
    }
};

module.exports = {
  getAll,
};
