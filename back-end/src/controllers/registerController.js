const express = require("express"); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require("body-parser"); // middleware
const { getRegisterInformation } = require("../services/registerService");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

const postRegisterPage = async (req, res) => {
  const { fullname, email, password, birthday } = req.body;

  const result = await getRegisterInformation(
    email,
    password,
    fullname,
    birthday
  );

  if (result.success) {
    res.status(201).send("User registered successfully");
  } else {
    res.status(500).send(`Registration failed: ${result.error}`);
  }
};

module.exports = {
  postRegisterPage,
};
