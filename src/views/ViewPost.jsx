import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPostByIdQuery } from '../features/posts/postsAPI';
import { useGetCommentsForPostQuery } from '../features/comments/commentsAPI';
import Post from '../components/Post';
import Comment from '../components/Comment';
import '../styles/viewPost.css';

function ViewPost() {
  const { id } = useParams();

  // Fetch post details
  const { data: post, error: postError, isLoading: postLoading } = useGetPostByIdQuery(id);

  // Fetch comments for this post
  const { data: comments, error: commentsError, isLoading: commentsLoading, refetch } = useGetCommentsForPostQuery(id);

  // Force refetch when the component is mounted or when navigating back
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (postLoading || commentsLoading) return <div className="loading-state">Loading...</div>;

  if (postError) {
    console.error("Post fetch error:", postError);
    return <div className="error-message">Error loading post.</div>;
  }

  if (commentsError) {
    console.error("Comments fetch error:", commentsError);
    return <div className="error-message">Error loading comments.</div>;
  }

  console.log("Fetched Comments:", comments); // ✅ Debugging

  // ✅ Sort comments by updatedAt in descending order (most recently updated first)
  const sortedComments = comments ? [...comments].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  ) : [];

  return (
    <div className="view-post-container">
      {/* Display Post */}
      <Post post={post} />

      {/* Display Comments using the Comment Component */}
      <div className="comments-container">
        <h3 className="comments-header">Comments</h3>
        {sortedComments.length > 0 ? (
          <ul className="comments-list">
            {sortedComments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
        ) : (
          <p className="no-comments">Currently no comments on this post.</p>
        )}
      </div>

      {/* Action Links */}
      <div className="view-post-actions">
        <Link to={`/dashboard/posts/${post.id}/comment`} className="add-comment-link">
          Add Comment
        </Link>
        <Link to={`/dashboard/posts/${post.id}/edit`} className="edit-btn">Edit</Link>
        <Link to="/dashboard/posts" className="view-post-back-btn">Back</Link>
        <button onClick={() => refetch()} className="refresh-btn">Refresh Comments</button> {/* ✅ Manual Refresh */}
      </div>
    </div>
  );
}

export default ViewPost;
