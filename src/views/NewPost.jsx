import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../features/posts/postsAPI"; // RTK Query
import { TextField, Button, CircularProgress, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import "../styles/newPost.css";

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public"); // Added visibility state
  const [createPost, { isLoading, error }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content, visibility }).unwrap(); // Send visibility along with title and content
      navigate("/dashboard/posts"); // ✅ Redirect to post list after success
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2>Create New Post</h2>

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        required
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Visibility selection (radio buttons) */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Visibility</FormLabel>
        <RadioGroup
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          row
        >
          <FormControlLabel value="public" control={<Radio />} label="Public" />
          <FormControlLabel value="friends" control={<Radio />} label="Friends Only" />
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
        sx={{
          padding: "12px",
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Post"}
      </Button>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error.message}</p>}
    </Box>
  );
}

export default NewPost;
