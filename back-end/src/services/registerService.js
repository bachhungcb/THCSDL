const sql = require('mssql');
const sqlConfig = require('../config/database');

//lấy email, password, fullname, birthday từ client
const getRegisterInformation = async (email, password, fullname, birthday) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool
            .request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .input('FullName', sql.NVarChar, fullname)
            .input('Birthday', sql.Date, birthday)
            // .input('Role', sql.NVarChar, 'user') // Set default role as user, sử dụng trigger để tự động thêm role
            .query(`INSERT INTO                     
                    Users(FullName, Email, Password, Birthday)
                    VALUES(@FullName, @Email, @Password, @Birthday)`);
        return result.rowsAffected[0] > 0; 
    } catch (err) {
        console.log(err);
        throw err; // Re-throw error to handle it in the controller
    }
};

module.exports = {
    getRegisterInformation
};
