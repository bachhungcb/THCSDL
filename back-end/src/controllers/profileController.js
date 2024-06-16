const express = require("express"); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require("body-parser"); // middleware
const {
  getUserById,
  changeAvatar,
  changeBirthday,
  changeFullName,
  changePassword,
} = require("../services/profileService");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

const getUser = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const user = await getUserById(userId);
    res.status(200).send(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const changeAvatarController = async (req, res) => {
  const { userId, avatar } = req.body;
  try {
    const result = await changeAvatar(userId, avatar);
    res.status(200).json(result);
  } catch (error) {
    console.error("Change avatar error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const changeBirthdayController = async (req, res) => {
  const { userId, birthday } = req.body;
  try {
    const result = await changeBirthday(userId, birthday);
    res.status(200).json(result);
  } catch (error) {
    console.error("Change birthday error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const changeFullNameController = async (req, res) => {
  const { userId, fullName } = req.body;
  try {
    const result = await changeFullName(userId, fullName);
    res.status(200).json(result);
  } catch (error) {
    console.error("Change full name error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const changePasswordController = async (req, res) => {
  const { userId, newPassword } = req.body;
  console.log(userId, newPassword);
  try {
    const result = await changePassword(userId, newPassword);
    res.status(200).json(result);
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUser,
  changeAvatarController,
  changeBirthdayController,
  changeFullNameController,
  changePasswordController,
};
