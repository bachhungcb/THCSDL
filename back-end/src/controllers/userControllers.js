const {postComment, getComments, editComment, deleteComment} = require('../services/CRUDService');

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
const getCommentsController = async (req, res) => {
    const { animeId } = req.params;
    try {
        const result = await getComments(animeId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Get comment error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const editCommentController = async (req, res) => {
    const { userId, animeId,commentId, comment } = req.body;
    try {
        const result = await editComment(userId, animeId,commentId, comment);
        res.status(200).json(result);
    } catch (error) {
        console.error('Edit comment error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const deleteCommentController = async (req, res) => {
    const { userId, animeId,commentId } = req.body;
    try {
        const result = await deleteComment(userId, animeId,commentId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    postCommentController,
    getCommentsController,
    editCommentController,
    deleteCommentController
};