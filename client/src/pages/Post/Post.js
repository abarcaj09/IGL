import "./Post.css";
import React, { useEffect } from "react";
import PostView from "./PostView";
import PostPreviews from "../../components/PostPreviews";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoMatch from "../../components/NoMatch";
import { initPost, initUserPreviews } from "../../reducers/postsReducer";

const Post = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const {
    postToView,
    userPreviews,
    userPreviewsLoaded,
    userPreviewsError,
  } = useSelector(({ posts }) => {
    return posts;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(initPost(postId));
  }, [location.pathname, dispatch, postId]);

  useEffect(() => {
    if (postToView && !postToView.error) {
      dispatch(initUserPreviews(postToView.user.username));
    }
  }, [postToView, dispatch]);

  if (postToView && postToView.error) {
    return <NoMatch />;
  }

  return (
    <div>
      {postToView && postToView.id === postId ? ( // if postToView.id !== postId then don't render yet because it is the previous postToView
        <div className="post">
          <PostView {...postToView} />

          {/* if post creator has more post besides this one  (user.posts.length > 1) then render this */}
          {userPreviewsLoaded && userPreviewsError ? (
            <p>Failed loading more posts from this user.</p>
          ) : (
            <div>
              {userPreviewsLoaded && userPreviews.length > 1 && (
                <div className="post-userPreviews">
                  <p>
                    More from{" "}
                    <Link to={`/${postToView.user.username}`}>
                      {postToView.user.username}
                    </Link>
                  </p>

                  <PostPreviews
                    posts={userPreviews.filter((post) => {
                      return post.id !== postId;
                    })}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Post;
