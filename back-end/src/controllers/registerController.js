const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // middleware
const { getRegisterInformation } = require('../services/registerService');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

const postRegisterPage = async (req, res) => {
    const { fullname, email, password, birthday } = req.body;
    try {
        const isRegisterSuccessful = await getRegisterInformation(email, password, fullname, birthday);
        if (isRegisterSuccessful) {
            res.status(200).json({ isRegisterSuccessful: true }); // OK
        } else {
            res.status(401).json({ isRegisterSuccessful: false }); // Unauthorized
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ isRegisterSuccessful: false }); // Internal Server Error
    }
};

module.exports = {
    postRegisterPage,
};
