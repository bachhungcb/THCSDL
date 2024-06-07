const sql = require('mssql');
const sqlConfig = require('../config/database');


const getRegisterInformation = async (email, password, fullname, birthday, phonenumber) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool
            .request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .input('FullName', sql.NVarChar, fullname)
            .input('Birthday', sql.Date, birthday)
            .query(`INSERT INTO 
                    Users(FullName, Email, Password, Birthday)
                    VALUES(@FullName, @email, @password, @Birthday)`);
                    console.log(result.recordset);
        return result.recordset; // Return true if login is successful
    } catch (err) {
        console.log(err);
        throw err; // Re-throw error to handle it in the controller
    }
};

module.exports = {
    getRegisterInformation
};
