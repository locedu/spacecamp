import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAddCommentMutation } from '../features/comments/commentsAPI';
import '../styles/newComment.css';

function NewComment() {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [addComment, { isLoading, error }] = useAddCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment({ postId, content }).unwrap();
      navigate(`/dashboard/posts/${postId}`);
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <div className="new-comment-container">
      <h2>Add a Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment here..."
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
      {error && <p className="error-message">Error submitting comment.</p>}
    </div>
  );
}

export default NewComment;  // ✅ Ensure this line exists
