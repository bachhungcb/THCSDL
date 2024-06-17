const express = require("express"); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require("body-parser"); // middleware
const { getLoginInformation } = require("../services/loginService");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

const postLoginPage = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isLoginSuccessful = await getLoginInformation(email, password);
    if (isLoginSuccessful.Result === 1) {
      res
        .status(200)
        .json({
          loginSuccessful: true,
          userID: isLoginSuccessful.Id,
          userRole: isLoginSuccessful.Role,
          userPassword: isLoginSuccessful.Password,
        }); // OK with JSON response
    } else {
      res.status(401).json({ loginSuccessful: false }); // Unauthorized with JSON response
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error with JSON response
  }
};

module.exports = {
  postLoginPage,
};
