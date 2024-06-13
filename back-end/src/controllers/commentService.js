const express = require("express"); // Include ExpressJS
const app = express(); // Create an ExpressJS app
const bodyParser = require("body-parser"); // middleware
const { updateUserComment } = require("../services/commentService");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

const postComment = async (req, res) => {
    const { userId, animeId, comment } = req.body;
    try {
        const isUpdated = await updateUserComment(userId, animeId, comment);
        if (isUpdated.Result === 1) {
            res.status(200).json({ updated: true }); // OK with JSON response
        } else {
            res.status(401).json({ updated: false }); // Unauthorized with JSON response
        }
    } catch (error) {
        console.error("Comment error:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error with JSON response
    }
}

module.exports = {
    postComment
};