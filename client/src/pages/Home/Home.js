import "./Home.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/authReducer";
import { clearSuccess } from "../../reducers/postsReducer";
import { initHomePosts, initSuggestions } from "../../reducers/userReducer";
import ProfileRow from "../../components/ProfileRow";
import PostCard from "./PostCard";
import FollowButton from "../../components/FollowButton";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => {
    return user;
  });

  const auth = useSelector(({ auth }) => {
    return auth;
  });

  const { creationSuccess, post } = useSelector(({ posts }) => {
    return posts;
  });

  // clear success so user can create another post
  useEffect(() => {
    if (creationSuccess) {
      dispatch(clearSuccess());
    }
  }, [creationSuccess, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(initHomePosts(auth.user.username, auth.config));
    dispatch(initSuggestions(auth.user.username, auth.config));
  }, [dispatch, auth.config, auth.user.username]);

  // wait until server has returned something for home posts
  // and suggestions
  if (!(user.homePostsLoaded && user.suggestionsLoaded)) {
    return null;
  }

  return (
    <div className="home">
      <div className="home-posts">
        {post && (
          <div className="home-post">
            <PostCard {...post} />
          </div>
        )}

        {user.homePostsError ? (
          <p>Failed loading posts.</p>
        ) : (
          <>
            {/* if the user doesn't follow anyone or the people they follow haven't created any posts */}
            {user.homePosts.length === 0 ? (
              <p>Posts from users you follow will appear here.</p>
            ) : (
              user.homePosts.map((post) => {
                return (
                  <div key={post.id} className="home-post">
                    <PostCard {...post} />
                  </div>
                );
              })
            )}
          </>
        )}
      </div>

      <div className="home-suggestions">
        <ProfileRow {...user} largePic>
          <button onClick={() => dispatch(logout())}>Log Out</button>
        </ProfileRow>

        {user.suggestionsError ? (
          <div>
            <p>Failed loading suggestions.</p>
          </div>
        ) : (
          <>
            {/* if the user follows every user */}
            {user.suggestions.length === 0 ? (
              <p>No suggestions at this time</p>
            ) : (
              <p>Suggestions for you</p>
            )}
            {user.suggestions.map((profile) => (
              <ProfileRow key={profile.id} {...profile}>
                <FollowButton {...profile} />
              </ProfileRow>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
