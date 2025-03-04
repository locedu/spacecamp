import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} from "../features/posts/postsAPI";
import { useGetCommentsForPostQuery } from "../features/comments/commentsAPI";
import Post from "../components/Post";
import Comment from "../components/Comment";
import "../styles/viewPost.css";

function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Fetch post details (including comment count)
  const {
    data: post,
    error: postError,
    isLoading: postLoading,
    refetch: refetchPost,
  } = useGetPostByIdQuery(id);

  // Fetch comments for this post
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useGetCommentsForPostQuery(id);

  // Mutations for like/unlike
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  // Mutation to delete post
  const [deletePost] = useDeletePostMutation();

  // Force refetch when the component is mounted or when navigating back
  useEffect(() => {
    refetchComments();
  }, [refetchComments]);

  // Force refetching post data when comments change
  useEffect(() => {
    if (comments) {
      refetchPost();
    }
  }, [comments, refetchPost]);

  if (postLoading || commentsLoading)
    return <div className="loading-state">Loading...</div>;

  if (postError) {
    console.error("Post fetch error:", postError);
    return <div className="error-message">Error loading post.</div>;
  }

  if (commentsError) {
    console.error("Comments fetch error:", commentsError);
    return <div className="error-message">Error loading comments.</div>;
  }

  console.log("Fetched Comments:", comments);

  // Sort comments by updatedAt in descending order (most recently updated first)
  const sortedComments = comments
    ? [...comments].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      )
    : [];

  // Check if the user has liked the post
  const hasLiked = post?.likes?.some((like) => like.userId === user?.id);

  // Handle like/unlike toggle
  const handleLikeToggle = async () => {
    if (hasLiked) {
      await unlikePost(post.id);
    } else {
      await likePost(post.id);
    }
    refetchPost(); // Refresh post data after like/unlike action
  };

  // Handle post deletion
  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      await deletePost(id);
      navigate("/dashboard/posts"); // Redirect to posts list after deletion
    }
  };

  return (
    <div className="view-post-container">
      {/* Display Post */}
      <Post post={post} />

      {/* Like/Unlike Link */}
      <div className="like-section">
        <button
          className="like-btn"
          onClick={handleLikeToggle}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {hasLiked ? "Unlike" : "Like"}
        </button>
      </div>

      {/* Action Buttons in a Flexbox Row */}
      <div className="view-post-actions">
        <Link to={`/dashboard/posts/${post.id}/comment`} className="action-btn">
          Add Comment
        </Link>

        {user?.id === post.userId && (
          <>
            <Link
              to={`/dashboard/posts/${post.id}/edit`}
              className="action-btn"
            >
              Edit
            </Link>
            <button onClick={handleDelete} className="action-btn delete-btn">
              Delete
            </button>
          </>
        )}

        <Link to="/dashboard/posts" className="action-btn">
          Back
        </Link>
      </div>

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
    </div>
  );
}

export default ViewPost;
