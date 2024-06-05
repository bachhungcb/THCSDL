const sql = require('mssql');
const sqlConfig = require('../config/database');

const getLoginInformation = async (email, password) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool
            .request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query(`IF EXISTS(SELECT * FROM Users
                    WHERE Email = @email
                    AND Password = @password)
                    BEGIN
                        SELECT 1 AS Result
                    END
                    ELSE
                    BEGIN
                        SELECT 0 AS Result
                    END`);
        return result.recordset[0].Result === 1; // Return true if login is successful
    } catch (err) {
        console.log(err);
        throw err; // Re-throw error to handle it in the controller
    }
};

module.exports = {
    getLoginInformation
};
