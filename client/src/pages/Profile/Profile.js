import "./Profile.css";
import React, { useEffect, useState } from "react";
import { useLocation, Link, Redirect } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import GridOnIcon from "@material-ui/icons/GridOn";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import { initProfile } from "../../reducers/userReducer";
import SocialInfo from "../../components/SocialInfo";
import NoMatch from "../../components/NoMatch";
import FollowButton from "../../components/FollowButton";
import PostPreviews from "../../components/PostPreviews";

const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const profileName = location.pathname.split("/")[1]; // the profile's username
  const isSavedPage = location.pathname.split("/")[2] === "saved";

  const { profileToView, username, following } = useSelector(({ user }) => {
    return user;
  });

  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  const [profileFollowers, setProfileFollowers] = useState([]);
  const [profileFollowing, setProfileFollowing] = useState([]);

  useEffect(() => {
    dispatch(initProfile(profileName, config));
  }, [dispatch, profileName, config]);

  useEffect(() => {
    if (profileToView && !profileToView.error) {
      setProfileFollowers(profileToView.followers);
      setProfileFollowing(profileToView.following);
    }
  }, [profileToView]);

  // Redirect if user is trying to access someone else's saved posts
  if (isSavedPage && username !== profileName) {
    return <Redirect to={`/${profileName}`} />;
  }

  if (profileToView && profileToView.error) {
    return <NoMatch />;
  }

  return (
    <div>
      {profileToView && profileToView.username === profileName ? (
        <div className="profile">
          <div className="profile-header">
            <div className="profile-picture">
              <Avatar src={profileToView.profilePic} alt={profileToView.name} />
            </div>

            <div className="profile-overview">
              <div className="profile-overviewTop">
                <h2>{profileToView.username}</h2>
                {username === profileName ? (
                  <div className="profile-options">
                    <Link to="/accounts/edit">Edit Profile</Link>
                  </div>
                ) : (
                  <div
                    className={`profile-followButton ${
                      following.includes(profileToView.id)
                        ? "profile-followed"
                        : "profile-notFollowed"
                    }`}
                  >
                    <FollowButton
                      {...profileToView}
                      followers={profileFollowers}
                      setFollowers={setProfileFollowers}
                    />
                  </div>
                )}
              </div>
              <div className="profile-overviewCenter">
                <p>
                  <span>{profileToView.posts.length}</span>{" "}
                  {profileToView.posts.length === 1 ? "post" : "posts"}
                </p>

                <div className="profile-socialLabel">
                  <SocialInfo
                    count={profileFollowers.length}
                    relation="followers"
                    profiles={profileFollowers}
                  />
                </div>

                <div className="profile-socialLabel">
                  <SocialInfo
                    count={profileFollowing.length}
                    relation="following"
                    profiles={profileFollowing}
                  />
                </div>
              </div>

              <div className="profile-overviewBottom">
                <h1>{profileToView.name}</h1>
                <p>
                  {!profileToView.biography && username === profileName
                    ? "Edit your profile to add a biography"
                    : profileToView.biography}
                </p>
              </div>
            </div>
          </div>

          <div className="profile-userContent">
            <Link to={`/${profileName}`} replace>
              <div
                className={`profile-userContentOption ${
                  !isSavedPage && "selected"
                }`}
              >
                <GridOnIcon />
                <p>posts</p>
              </div>
            </Link>

            {/* Only show saved if it is page is the own user's profile page */}
            {username === profileName && (
              <Link to={`/${profileName}/saved`} replace>
                <div
                  className={`profile-userContentOption ${
                    isSavedPage && "selected"
                  }`}
                >
                  <BookmarkBorderIcon />
                  <p>saved</p>
                </div>
              </Link>
            )}
          </div>

          {isSavedPage ? (
            <PostPreviews
              posts={profileToView.saved}
              fallbackText="Posts you save will appear here."
            />
          ) : (
            profileToView.posts && (
              <PostPreviews
                posts={profileToView.posts}
                fallbackText={
                  username === profileName
                    ? "Posts you create will appear here."
                    : "No posts from this user."
                }
              />
            )
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
