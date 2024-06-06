const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // middleware
const sql = require('mssql');
const sqlConfig  = require('../config/database');

app.use(bodyParser.urlencoded({ extended: false }));

const getLoginInformation = async (email, password) =>{
    try{
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
        //console.log(result.recordset);
        
        if(result.recordset[0].Result === 1){
            console.log('Login successful');
        }else{
            console.log('Login failed');
        }
        return(result.recordset[0].Result);
        // Inform the state
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getLoginInformation
};