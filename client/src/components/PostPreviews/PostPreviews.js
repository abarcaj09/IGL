import "./PostPreviews.css";
import React from "react";
import PreviewCard from "./PreviewCard";

const PostPreviews = ({ posts, fallbackText }) => {
  return (
    <div className="postPreviews">
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostPreviewCard key={post.id} {...post} />)
      ) : (
        <p>{fallbackText}</p>
      )}
    </div>
  );
};

export default PostPreviews;
