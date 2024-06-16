const {
  postComment,
  getComments,
  editComment,
  deleteComment,
  getUserList,
  getCommentsForCharacter,
  postCommentForCharacter,
  editCommentForCharacter,
  deleteCommentForCharacter,
  banUser,
  unbanUser
} = require("../services/CRUDService");

const postCommentController = async (req, res) => {
  const { userId, animeId, comment } = req.body;
  try {
    const result = await postComment(userId, animeId, comment);
    res.status(200).json(result);
  } catch (error) {
    console.error("Post comment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getCommentsController = async (req, res) => {
  const { animeId } = req.params;
  try {
    const result = await getComments(animeId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Get comment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const editCommentController = async (req, res) => {
  const { userId, animeId, commentId, comment } = req.body;
  try {
    const result = await editComment(userId, animeId, commentId, comment);
    res.status(200).json(result);
  } catch (error) {
    console.error("Edit comment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteCommentController = async (req, res) => {
  const { userId, animeId, commentId } = req.body;
  try {
    const result = await deleteComment(userId, animeId, commentId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const postCommentForCharacterController = async (req, res) => {
  const { userId, characterId, comment } = req.body;
  try {
    const result = await postCommentForCharacter(userId, characterId, comment);
    res.status(200).json(result);
  } catch (error) {
    console.error("Post character comment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCommentsForCharacterController = async (req, res) => {
  const { characterId } = req.params;
  try {
    const result = await getCommentsForCharacter(characterId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Get character comment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editCommentForCharacterController = async (req, res) => {
  const { userId, characterId, commentId, comment } = req.body;
  try {
    const result = await editCommentForCharacter(userId, characterId, commentId, comment);
    res.status(200).json(result);
  } catch (error) {
    console.error("Edit character comment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCommentForCharacterController = async (req, res) => {
  const { userId, characterId, commentId } = req.body;
  try {
    const result = await deleteCommentForCharacter(userId, characterId, commentId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Delete character comment error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const banUserController = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await banUser(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Ban user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unbanUserController = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await unbanUser(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Unban user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserListController = async (req, res) => {
  try {
    const result = await getUserList();
    res.status(200).json(result);
  } catch (error) {
    console.error("Get user list error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  postCommentController,
  getCommentsController,
  editCommentController,
  deleteCommentController,
  getUserListController,
  postCommentForCharacterController,
  getCommentsForCharacterController,
  editCommentForCharacterController,
  deleteCommentForCharacterController,
  banUserController,
  unbanUserController
};
