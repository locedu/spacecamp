import React from 'react';
import { useParams } from 'react-router-dom';

function EditPost() {
  const { id } = useParams(); // Get post ID from URL

  return (
    <div>
      <h2>Edit Post {id}</h2>
      <p>Form to edit post will go here.</p>
    </div>
  );
}

export default EditPost;
