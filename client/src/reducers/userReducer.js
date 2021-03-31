import usersService from "../services/users";

const initialState = {
  // the current user's info
  id: "",
  username: "",
  name: "",
  profilePic: "",
  biography: "",
  followers: [],
  following: [],

  homePosts: [], // when url = /
  homePostsLoaded: false,
  homePostsError: "",

  suggestions: [], // when url = /
  suggestionsLoaded: false,
  suggestionsError: "",

  explorePosts: [], // when url = /explore
  explorePostsLoaded: false,
  explorePostsError: "",

  profileToView: null, // when url = /:username
  success: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER": // sets the current user's info
      const userFollowing = action.payload.following.map((user) => user.id);
      return {
        ...state,
        ...action.payload,
        following: userFollowing,
        // likes, saved, & posts will be part of posts reducer
        likes: null,
        saved: null,
        posts: null,
      };
    case "SET_USER_ERROR":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return initialState;
    case "FOLLOW_USER":
      return { ...state, following: action.payload };
    case "FOLLOW_USER_ERROR":
      return state;
    case "EDIT_PROFILE_TO_VIEW":
      return {
        ...state,
        profileToView: { ...state.profileToView, following: action.payload },
      };
    default:
      return state;
  }
};

export const setUser = (username, config) => {
  return async (dispatch) => {
    const userAccount = await usersService.getUser(username, config);

    if (userAccount.error) {
      return dispatch({
        type: "SET_USER_ERROR",
        payload: userAccount.error,
      });
    }

    dispatch({
      type: "SET_USER",
      payload: userAccount.profile,
    });
  };
};

export const followUser = (username, config) => {
  return async (dispatch) => {
    const self = await usersService.followUser(username, config);

    if (self.error) {
      return dispatch({
        type: "FOLLOW_USER_ERROR",
        payload: null,
      });
    }

    dispatch({
      type: "FOLLOW_USER",
      payload: self.following,
    });
  };
};

// modify profileToView when it is the user's own profile and
// they follow or unfollow users from the profile page
export const editProfileToView = (newFollowing) => {
  return (dispatch) => {
    dispatch({
      type: "EDIT_PROFILE_TO_VIEW",
      payload: newFollowing,
    });
  };
};

export default userReducer;
