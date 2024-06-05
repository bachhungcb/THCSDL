const express = require('express'); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // middleware
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }));

// Route to login page
app.get('/login', (req, res) => {
    console.log(__dirname + '/views/index.html')
    res.sendFile(__dirname + '/views/index.html');
  });

const login = async (req,res) =>{
    const loginPath = path.join(__dirname, '..', 'views', 'login.ejs');
    // const {username, password} = req.body;
    // if(username === 'admin' && password === 'admin'){
    //     res.send('Login success');
    // }else{
    //     res.send('Login failed');
    // }
    console.log(loginPath);
    try{
        res.render(loginPath)
    }catch(err){
        console.log(err)
    }
};

module.exports = {
    login
};