import "./Comment.css";
import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import commentsService from "../../services/comments";

const Comment = ({
  withProfilePic,
  profilePic,
  username,
  comment,
  timestamp,
  id,
  isCaption,
  postComments,
  setPostComments,
}) => {
  const user = useSelector(({ user }) => {
    return user;
  });

  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  const deleteComment = async () => {
    await commentsService.deleteComment(id, config);
    setPostComments(
      postComments.filter((comment) => {
        return comment.id !== id;
      })
    );
  };

  return (
    <div className="comment">
      <div className="comment-left">
        {withProfilePic && (
          <Link to={`/${username}`}>
            <Avatar src={profilePic} alt={username} />
          </Link>
        )}

        <div className="comment-body">
          <div className="comment-text">
            <h3>
              <Link to={`/${username}`}>{username}</Link>
            </h3>
            <p>{comment}</p>
          </div>

          <div className="comment-timestamp">
            {timestamp && <p>{timestamp}</p>}
          </div>
        </div>
      </div>

      <div className="comment-delete">
        {/* can't delete if user didn't create the comment or if the comment is the post caption */}
        {username === user.username && !isCaption && (
          <DeleteOutlineOutlinedIcon onClick={deleteComment} />
        )}
      </div>
    </div>
  );
};

export default Comment;
