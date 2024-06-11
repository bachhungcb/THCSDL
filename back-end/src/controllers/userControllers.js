const {postComment} = require('../services/CRUDService');

const postCommentController = async (req, res) => {
    const { userId, animeId, comment } = req.body;
    try {
        const result = await postComment(userId, animeId, comment);
        res.status(200).json(result);
    } catch (error) {
        console.error('Post comment error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    postCommentController,
};