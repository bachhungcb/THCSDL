require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3030;//8080
const hostname = process.env.DB_HOST || 'localhost';

const app = express();
app.use(cors());
app.get("/api/v1", (req, res) => {
    res.send("hello !!!!");
  });
app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});