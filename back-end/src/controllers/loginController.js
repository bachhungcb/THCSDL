const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // middleware
const path = require('path');
const { getLoginInformation } = require('../services/loginService');

app.use(bodyParser.urlencoded({ extended: false }));

const postLoginPage = async (req,res) =>{
    let {email, password} = req.body;
    await getLoginInformation(email, password);
    res.status(200).JSON({success: true});

};

const getLoginPage = async (req,res) =>{
    const loginPath = path.join(__dirname, '..', 'views', 'login.ejs'); //route to login page
    res.render(loginPath);
}

module.exports = {
    postLoginPage,
    getLoginPage
};