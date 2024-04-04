const express = require('express');
const app = express();

const port = process.env.PORT || 3030;//8080
const hostname = process.env.HOSTNAME; 

app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});