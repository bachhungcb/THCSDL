import React, { useState, useEffect } from 'react';
import { List, Input, Button, Form, message, Empty, Avatar } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

function CommentBox({ animeId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/comments/${animeId}`);
            setComments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching comments:', error);
            message.error('Failed to load comments.');
            setLoading(false);
        }
    };

    const getUserRole = () => {
        return sessionStorage.getItem('userRole');
    };

    const handlePostComment = async () => {
        if (!newComment) {
            message.error('Please enter a comment.');
            return;
        }
        try {
            const userId = sessionStorage.getItem('userID');
            await axios.post('http://localhost:8080/comments', { userId, animeId, comment: newComment });
            message.success('Comment posted successfully.');
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error posting comment:', error);
            message.error('Failed to post comment.');
        }
    };

    const handleEditComment = (comment) => {
        setEditingComment(comment);
        setEditingText(comment.comment);
    };

    const handleSaveEdit = async () => {
        try {
            const { Id: commentId, users_id: userId } = editingComment;
            await axios.put('http://localhost:8080/comments', { userId, animeId, commentId, comment: editingText });
            message.success('Comment updated successfully.');
            setEditingComment(null);
            setEditingText('');
            fetchComments();
        } catch (error) {
            console.error('Error updating comment:', error);
            message.error('Failed to update comment.');
        }
    };

    const handleDeleteComment = async (commentId, userId) => {
        try {
            await axios.delete(`http://localhost:8080/comments`, {
                data: {commentId, userId, animeId }
            });
            message.success('Comment deleted successfully.');
            // Update local state to remove the deleted comment
            setComments(comments.filter(comment => comment.Id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            message.error('Failed to delete comment.');
        }
    };

    const userId = parseInt(sessionStorage.getItem('userID'));
    const userRole = getUserRole();
    console.log('userRole:', userRole);

    return (
        <div>
            {comments.length > 0 ? (
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item
                            key={`${item.Id}-${item.users_id}`}
                            actions={[
                                ...(item.users_id === userId ? [<Button onClick={() => handleEditComment(item)}>Edit</Button>] : []),
                                ...(item.users_id === userId || userRole === `"admin"` ? [<Button onClick={() => handleDeleteComment(item.Id, item.users_id)}>Delete</Button>] : [])
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.Avatar} />}
                                title={item.FullName}
                                description={editingComment && editingComment.Id === item.Id ? (
                                    <div>
                                        <TextArea
                                            rows={4}
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                        />
                                        <Button type="primary" onClick={handleSaveEdit} style={{ marginTop: 8 }}>
                                            Save
                                        </Button>
                                    </div>
                                ) : item.comment}
                            />
                        </List.Item>
                    )}
                />
            ) : !loading && (
                <Empty description="No comments yet" />
            )}
            <Form.Item>
                <TextArea
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handlePostComment}>
                    Add Comment
                </Button>
            </Form.Item>
        </div>
    );
};

export default CommentBox;
