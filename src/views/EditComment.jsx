import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCommentByIdQuery, useUpdateCommentMutation } from '../features/comments/commentsAPI';
import styles from '../styles/EditComment.module.css'; // ✅ Import CSS Module

function EditComment() {
  const { id } = useParams(); // Get comment ID from URL
  const navigate = useNavigate();

  // Fetch the existing comment
  const { data: comment, error, isLoading } = useGetCommentByIdQuery(id);
  const [updateComment] = useUpdateCommentMutation();

  // Local state for the comment content
  const [content, setContent] = useState('');

  // Populate the form when data is available
  useEffect(() => {
    if (comment) {
      setContent(comment.content);
    }
  }, [comment]);

  // Handle input change
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateComment({ id, content }).unwrap();
      navigate(-1); // Go back to the previous page
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  if (isLoading) return <div className={styles.loadingState}>Loading comment...</div>;
  if (error || !comment) return <div className={styles.errorMessage}>Error loading comment.</div>;

  return (
    <div className={styles.editCommentContainer}>
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <label>Comment</label>
        <textarea
          name="content"
          value={content}
          onChange={handleChange}
          required
        ></textarea>

        <div className={styles.editCommentActions}>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className={styles.saveBtn}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditComment;
