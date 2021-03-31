import "./PostOptions.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { removePost, removeCreatedPost } from "../../reducers/postsReducer";
import Modal from "../Modal";
import FollowButton from "../FollowButton";

const PostOptions = ({ postCreator, postId, toPost, toProfile }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useSelector(({ user }) => {
    return user.id;
  });

  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  const { post, userSaved } = useSelector(({ posts }) => {
    return posts;
  });

  const [isOpen, setIsOpen] = useState(false);

  const deletePost = () => {
    // remove from user's saved posts, if this post was included in it
    const newUserSaved = userSaved.filter(
      (savedPostId) => savedPostId !== postId
    );

    // remove the user's created post so it won't appear
    // on the Home page
    if (post && post.id === postId) {
      dispatch(removeCreatedPost(newUserSaved));
    }

    dispatch(removePost(postId, config, newUserSaved));
    history.push("/");
  };

  return (
    <div>
      <MoreHorizIcon onClick={() => setIsOpen(true)} />
      <Modal isOpen={isOpen}>
        <div className="postOptions">
          {/* if user created this post, allow them to delete it. else 
            allow them to follow or unfollow the creator of the post */}
          {id === postCreator.id ? (
            <button className="postOptions-warn" onClick={deletePost}>
              Delete Post
            </button>
          ) : (
            <FollowButton {...postCreator} altText={"Unfollow"} />
          )}

          {toPost && (
            <Link to={`/p/${postId}`} onClick={() => setIsOpen(false)}>
              <button className="postOptions-link">Go to post</button>
            </Link>
          )}

          {toProfile && (
            <Link
              to={`/${postCreator.username}`}
              onClick={() => setIsOpen(false)}
            >
              <button className="postOptions-link">Go to profile</button>
            </Link>
          )}

          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default PostOptions;
