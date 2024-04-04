const express = require('express');
const app = express();

const port = process.env.PORT || 3030;//8080
const hostname = process.env.DB_HOST || 'localhost';

//biểu diễn cách connect tới database
app.get('/', function (req, res) {
   
    var sql = require("mssql/msnodesqlv8");

    // config for your database
    var config = {
        user: 'fuon1412',
        password: 'phuongct1412',
        server: 'localhost', 
        database: 'AnimeDatabase',
        port: 1433
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from anime', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});