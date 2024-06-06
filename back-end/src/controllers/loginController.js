const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // middleware
const { getLoginInformation } = require('../services/loginService');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies


const postLoginPage = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isLoginSuccessful = await getLoginInformation(email, password);
        if (isLoginSuccessful) {
            res.sendStatus(200); // OK
        } else {
            res.sendStatus(401); // Unauthorized
        }
    } catch (error) {
        console.error('Login error:', error);
        res.sendStatus(500); // Internal Server Error
    }
};

module.exports = {
    postLoginPage,
};
