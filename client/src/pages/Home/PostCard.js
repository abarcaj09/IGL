import "./PostCard.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceStrict } from "date-fns";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PostHeader from "../../components/PostHeader";
import PostInterface from "../../components/PostInterface";
import Slides from "../../components/Slides";
import SocialInfo from "../../components/SocialInfo";
import Comment from "../../components/Comment";
import AddComment from "../../components/AddComment";
import PostOptions from "../../components/PostOptions";

const PostCard = ({
  caption,
  images,
  user,
  likes,
  comments,
  id,
  createdAt,
}) => {
  const [commentError, setCommentError] = useState(false);
  const [postComments, setPostComments] = useState(comments);
  const [postLikes, setPostLikes] = useState(likes);

  useEffect(() => {
    setPostLikes(likes);
  }, [likes]);
  useEffect(() => {
    setPostComments(comments);
  }, [comments]);

  return (
    <div className="postCard">
      <div className="postCard-below">
        <PostHeader home profilePic={user.profilePic} username={user.username}>
          <PostOptions postCreator={user} postId={id} toPost toProfile />
        </PostHeader>
      </div>

      <div className="postCard-images">
        <Slides photos={images} />
      </div>

      <div className="postCard-below">
        <PostInterface
          postId={id}
          postLikes={postLikes}
          setPostLikes={setPostLikes}
        >
          <Link to={`/p/${id}`}>
            <ChatBubbleOutlineIcon />
          </Link>
        </PostInterface>

        <div className="postCard-likes">
          <SocialInfo
            count={postLikes.length}
            relation="likes"
            profiles={postLikes}
          />
        </div>

        <div className="postCard-caption">
          {caption && (
            <Comment username={user.username} comment={caption} isCaption />
          )}
        </div>

        {commentError && (
          <p className="postCard-commentError">Unable to add comment</p>
        )}

        <div className="postCard-comments">
          {postComments.slice(0, 2).map((comment) => {
            return (
              <div className="postCard-comment">
                <Comment
                  key={comment.id}
                  username={comment.user.username}
                  comment={comment.comment}
                  id={comment.id}
                  postComments={postComments}
                  setPostComments={setPostComments}
                />
              </div>
            );
          })}
        </div>

        <div className="postCard-timestamp">
          <h4>
            {formatDistanceStrict(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </h4>
        </div>

        <hr />

        <div className="postCard-addComment">
          <AddComment
            setCommentError={setCommentError}
            postComments={postComments}
            setPostComments={setPostComments}
            postId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
