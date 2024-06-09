const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // middleware
const { getUserById } = require('../services/profileService');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

const getUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    console.log('userId:', userId);
    try {
        const user = await getUserById(userId);
        res.status(200).send(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = {
    getUser
}