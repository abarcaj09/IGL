import "./AddComment.css";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import commentsService from "../../services/comments";

const AddComment = ({
  setCommentError,
  postId,
  postComments,
  setPostComments,
}) => {
  const [comment, setComment] = useState("");
  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  const { username, profilePic, id } = useSelector(({ user }) => {
    return user;
  });

  const textareaRef = useRef(null);

  // resize the textarea as the user types
  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [comment]);

  const postComment = async (e) => {
    e.preventDefault();
    setCommentError(false);
    const createdComment = await commentsService.newComment(
      { comment, postId },
      config
    );

    if (createdComment.error) {
      setCommentError(true);
    } else {
      setPostComments([
        {
          user: { username, profilePic, id },
          comment: createdComment.comment,
          id: createdComment.id,
          createdAt: createdComment.createdAt,
        },
        ...postComments,
      ]);
    }
    setComment("");
  };

  const buttonDisabled = () => {
    return !config || !comment;
  };

  return (
    <div className="addComment">
      <form className="addComment-form" onSubmit={postComment}>
        <textarea
          ref={textareaRef}
          name="comment"
          placeholder={config ? "Add a comment..." : "Log in to comment"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
        />

        <button
          type="submit"
          disabled={buttonDisabled()} // disable button if no comment or user not logged in
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
