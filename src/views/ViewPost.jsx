import React from 'react';
import { useParams } from 'react-router-dom';

function ViewPost() {
  const { id } = useParams(); // Get post ID from URL

  return (
    <div>
      <h2>Viewing Post {id}</h2>
      <p>Post details will go here.</p>
    </div>
  );
}

export default ViewPost;
