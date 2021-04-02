import "./Explore.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initExplorePosts } from "../../reducers/userReducer";
import PostPreviews from "../../components/PostPreviews";

const Explore = () => {
  const dispatch = useDispatch();
  const {
    explorePosts,
    explorePostsLoaded,
    explorePostsError,
    username,
  } = useSelector(({ user }) => {
    return user;
  });
  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  useEffect(() => {
    dispatch(initExplorePosts(username, config));
  }, [dispatch, username, config]);

  if (!explorePostsLoaded) {
    return null;
  }

  return (
    <div className="explore">
      {explorePostsError ? (
        <p>Failed loading posts.</p>
      ) : (
        <div>
          {explorePosts.length > 0 ? (
            <PostPreviews posts={explorePosts} />
          ) : (
            <p>No Explore posts at this time</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
