const sql = require('mssql');
const sqlConfig = require('../config/database');
const bcrypt = require('bcrypt');

const getLoginInformation = async (email, inputPassword) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let user = await pool
            .request()
            .input('email', sql.NVarChar, email)
            .query(`SELECT Password, Id FROM Users WHERE Email = @email`);

        if (user.recordset.length > 0) {
            const passwordMatch = await bcrypt.compare(inputPassword, user.recordset[0].Password);
            if (passwordMatch) {
                return { Result: 1, Id: user.recordset[0].Id };
            }
        }

        return { Result: 0 };
    } catch (err) {
        console.log(err);
        throw err; // Re-throw error to handle it in the controller
    }
};

module.exports = {
    getLoginInformation
};
