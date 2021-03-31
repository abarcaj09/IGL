import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, editProfileToView } from "../../reducers/userReducer";

const FollowButton = ({
  username,
  id,
  profilePic,
  name,
  altText,
  followers,
  setFollowers,
}) => {
  const dispatch = useDispatch();
  const [follows, setFollows] = useState(false);

  const user = useSelector(({ user }) => {
    return user;
  });

  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  useEffect(() => {
    if (user.following.includes(id)) {
      setFollows(true);
    } else {
      setFollows(false);
    }
  }, [user.following]);

  const follow = () => {
    setFollows(true);
    dispatch(followUser(username, config));

    if (followers) {
      setFollowers([
        {
          username: user.username,
          id: user.id,
          profilePic: user.profilePic,
          name: user.name,
        },
        ...followers,
      ]);
    } else if (user.profileToView && user.profileToView.id === user.id) {
      dispatch(
        editProfileToView([
          { username, id, profilePic, name },
          ...user.profileToView.following,
        ])
      );
    }
  };

  const unfollow = () => {
    setFollows(false);
    dispatch(followUser(username, config));

    if (followers) {
      setFollowers(followers.filter((followed) => followed.id !== user.id));
    } else if (user.profileToView && user.profileToView.id === user.id) {
      dispatch(
        editProfileToView(
          user.profileToView.following.filter((followed) => followed.id !== id)
        )
      );
    }
  };

  // Don't return a button if this is the user's own profile
  if (user.id === id) {
    return null;
  }

  // button will be disabled if user is not logged in
  return follows ? (
    <button
      className="followingButton"
      disabled={!config}
      onClick={() => unfollow()}
    >
      {altText || "Following"}
    </button>
  ) : (
    <button
      className="followingButton"
      disabled={!config}
      onClick={() => follow()}
    >
      Follow
    </button>
  );
};

export default FollowButton;
