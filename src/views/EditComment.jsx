import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCommentByIdQuery, useUpdateCommentMutation } from '../features/comments/commentsAPI';
import '../styles/editComment.css';

function EditComment() {
  const { id } = useParams(); // Get comment ID from URL
  const navigate = useNavigate();

  // Fetch comment data
  const { data: comment, error, isLoading } = useGetCommentByIdQuery(id);
  const [updateComment] = useUpdateCommentMutation(); // Mutation for updating comment

  // Local state for form field
  const [content, setContent] = useState('');

  // Populate form once comment data is available
  useEffect(() => {
    if (comment) {
      setContent(comment.content);
    }
  }, [comment]);

  // Handle input changes
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateComment({ commentId: id, content });
    navigate(`/dashboard/posts/${comment.postId}`); // Redirect back to the post
  };

  if (isLoading) return <div className="loading-state">Loading comment...</div>;
  if (error || !comment) return <div className="error-message">Error loading comment.</div>;

  return (
    <div className="edit-comment-container">
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <label>Comment</label>
        <textarea
          name="content"
          value={content}
          onChange={handleChange}
          required
        ></textarea>

        <div className="edit-comment-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => navigate(`/dashboard/posts/${comment.postId}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditComment;
