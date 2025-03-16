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
import { ThumbUp, AddComment, EditNote, DeleteForever } from "@mui/icons-material"; // ✅ Import icons
import styles from "../styles/ViewPost.module.css"; // ✅ Using new module

function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
    refetch: refetchPost,
  } = useGetPostByIdQuery(id);

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useGetCommentsForPostQuery(id);

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    refetchComments();
  }, [refetchComments]);

  useEffect(() => {
    if (comments) {
      refetchPost();
    }
  }, [comments, refetchPost]);

  if (postLoading || commentsLoading) return <div className={styles.loadingState}>Loading...</div>;
  if (postError) return <div className={styles.errorMessage}>Error loading post.</div>;
  if (commentsError) return <div className={styles.errorMessage}>Error loading comments.</div>;

  const sortedComments = comments ? [...comments].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) : [];
  const hasLiked = post?.likes?.some((like) => like.userId === user?.id);

  const handleLikeToggle = async () => {
    if (hasLiked) {
      await unlikePost(post.id);
    } else {
      await likePost(post.id);
    }
    refetchPost();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      await deletePost(id);
      navigate("/dashboard/posts");
    }
  };

  return (
    <div className={styles.viewPostContainer}>
      <Post post={post} />

      {/* ✅ Button container with uniform button sizes */}
      <div className={styles.postActionsWrapper}>
        <div className={styles.postActionsContainer}>
          <button className={`${styles.actionBtn} ${styles.uniformBtn}`} onClick={handleLikeToggle}>
            <ThumbUp fontSize="small" className={styles.icon} /> {/* ✅ Like icon */}
            {hasLiked ? " Unlike" : " Like"}
          </button>

          <Link to={`/dashboard/posts/${post.id}/comment`} className={`${styles.actionBtn} ${styles.commentBtn}`}>
            <AddComment fontSize="small" className={styles.icon} /> {/* ✅ Comment icon */}
            Comment
          </Link>

          {user?.id === post.userId && (
            <>
              <Link to={`/dashboard/posts/${post.id}/edit`} className={`${styles.actionBtn} ${styles.uniformBtn}`}>
                <EditNote fontSize="small" className={styles.icon} /> {/* ✅ Edit icon */}
                Edit
              </Link>
              <button onClick={handleDelete} className={`${styles.actionBtn} ${styles.deleteBtn} ${styles.uniformBtn}`}>
                <DeleteForever fontSize="small" className={styles.icon} /> {/* ✅ Delete icon */}
                Delete
              </button>
            </>
          )}

          {/* <Link to="/dashboard/posts" className={`${styles.actionBtn} ${styles.uniformBtn}`}>
            Back
          </Link> */}
        </div>
      </div>

      {/* ✅ New comments wrapper */}
      <div className={styles.commentsWrapper}>
        <h3 className={styles.commentsHeader}>Comments</h3>
        {sortedComments.length > 0 ? (
          <ul className={styles.commentsList}>
            {sortedComments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
        ) : (
          <p className={styles.noComments}>Currently no comments on this post.</p>
        )}
      </div>
    </div>
  );
}

export default ViewPost;
