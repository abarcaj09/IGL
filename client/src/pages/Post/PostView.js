import "./PostView.css";
import React, { useState, useEffect } from "react";
import { formatDistanceStrict } from "date-fns";
import Slides from "../../components/Slides";
import PostHeader from "../../components/PostHeader";
import PostOptions from "../../components/PostOptions";
import Comment from "../../components/Comment";
import PostInterface from "../../components/PostInterface";
import SocialInfo from "../../components/SocialInfo";
import AddComment from "../../components/AddComment";

const PostView = ({
  caption,
  images,
  user,
  likes,
  comments,
  id,
  createdAt,
}) => {
  const [commentError, setCommentError] = useState(false);
  const [postLikes, setPostLikes] = useState(likes);
  const [postComments, setPostComments] = useState(comments);

  useEffect(() => {
    setPostLikes(likes);
  }, [likes]);

  useEffect(() => {
    setPostComments(comments);
  }, [comments]);

  return (
    <div className="postView">
      <div className="postView-photos">
        <Slides photos={images} />
      </div>

      <div className="postView-right">
        <div className="postView-header">
          <PostHeader
            home
            profilePic={user.profilePic}
            username={user.username}
            postId={id}
          >
            <PostOptions postCreator={user} postId={id} toProfile />
          </PostHeader>
        </div>

        <div className="postView-comments">
          {/* First Comment is the post caption */}
          {caption && (
            <div className="postView-comment">
              <Comment
                withProfilePic
                profilePic={user.profilePic}
                username={user.username}
                comment={caption}
                isCaption
                timestamp={formatDistanceStrict(
                  new Date(createdAt),
                  new Date(),
                  {
                    addSuffix: true,
                  }
                )}
              />
            </div>
          )}

          {commentError && (
            <div className="postView-comment">
              <p className="postView-commentError">Unable to add comment</p>
            </div>
          )}

          {postComments.map((comment) => {
            return (
              <div key={comment.id} className="postView-comment">
                <Comment
                  withProfilePic
                  profilePic={comment.user.profilePic}
                  username={comment.user.username}
                  comment={comment.comment}
                  id={comment.id}
                  timestamp={formatDistanceStrict(
                    new Date(comment.createdAt),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                  postComments={postComments}
                  setPostComments={setPostComments}
                />
              </div>
            );
          })}
        </div>

        <div className="postView-bottom">
          <PostInterface
            postId={id}
            postLikes={postLikes}
            setPostLikes={setPostLikes}
          />

          <SocialInfo
            count={postLikes.length}
            relation="likes"
            profiles={postLikes}
          />

          <h4>
            {formatDistanceStrict(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </h4>

          <div className="postView-separator"></div>

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

export default PostView;
