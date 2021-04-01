import "./PostInterface.css";
import React, { useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { likePost, savePost } from "../../reducers/postsReducer";
import { useHistory } from "react-router-dom";

const PostInterface = ({ postId, postLikes, setPostLikes, children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userLikes, userSaved } = useSelector(({ posts }) => {
    return posts;
  });

  const { name, username, profilePic, id } = useSelector(({ user }) => {
    return user;
  });

  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (userLikes.includes(postId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [userLikes, postId]);

  useEffect(() => {
    if (userSaved.includes(postId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [userSaved, postId]);

  // action will be a function such as like/unlike
  // interacting with post is only allowed if user is signed in
  const postInteraction = (action) => {
    if (!config) {
      history.push("/accounts/login");
    } else {
      action();
    }
  };

  const like = () => {
    dispatch(likePost(postId, config));
    setPostLikes([{ name, username, profilePic, id }, ...postLikes]);
    setIsLiked(true);
  };

  const unlike = () => {
    dispatch(likePost(postId, config));
    setPostLikes(
      postLikes.filter((user) => {
        return user.username !== username;
      })
    );
    setIsLiked(false);
  };

  const save = () => {
    dispatch(savePost(postId, config));
    setIsSaved(true);
  };

  const unsave = () => {
    dispatch(savePost(postId, config));
    setIsSaved(false);
  };

  return (
    <div className="postInterface">
      <div className="postInterface-left">
        {isLiked ? (
          <FavoriteIcon
            className="postInterface-liked"
            onClick={() => postInteraction(unlike)}
          />
        ) : (
          <FavoriteBorderIcon onClick={() => postInteraction(like)} />
        )}

        {/* Renders the comment icon if given */}
        {children}
      </div>

      <div className="postInterface-right ">
        {isSaved ? (
          <BookmarkIcon onClick={() => postInteraction(unsave)} />
        ) : (
          <BookmarkBorderIcon onClick={() => postInteraction(save)} />
        )}
      </div>
    </div>
  );
};

export default PostInterface;
