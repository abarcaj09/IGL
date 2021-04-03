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
  success: false,
  error: "",

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
    case "HOME_POSTS":
      return {
        ...state,
        homePosts: action.payload,
        homePostsLoaded: true,
        homePostsError: "",
      };
    case "HOME_POSTS_ERROR":
      return {
        ...state,
        homePostsError: action.payload,
        homePostsLoaded: true,
      };
    case "SUGGESTIONS":
      return {
        ...state,
        suggestions: action.payload,
        suggestionsLoaded: true,
        suggestionsError: "",
      };
    case "SUGGESTIONS_ERROR":
      return {
        ...state,
        suggestionsError: action.payload,
        suggestionsLoaded: true,
      };
    case "PROFILE_TO_VIEW":
      return { ...state, profileToView: action.payload };
    case "EDIT_USER_PROFILE":
      return { ...state, ...action.payload, error: "", success: true };
    case "CLEAR_USER_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_USER_SUCCESS":
      return { ...state, success: action.payload };

    case "EXPLORE_POSTS":
      return {
        ...state,
        explorePosts: action.payload,
        explorePostsLoaded: true,
        explorePostsError: "",
      };
    case "EXPLORE_POSTS_ERROR":
      return {
        ...state,
        explorePostsError: action.payload,
        explorePostsLoaded: true,
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

export const initHomePosts = (username, config) => {
  return async (dispatch) => {
    const home = await usersService.getUserHomePosts(username, config);

    if (home.error) {
      return dispatch({
        type: "HOME_POSTS_ERROR",
        payload: home.error,
      });
    }

    dispatch({
      type: "HOME_POSTS",
      payload: home.posts,
    });
  };
};

export const initSuggestions = (username, config) => {
  return async (dispatch) => {
    const profiles = await usersService.getUserSuggestions(username, config);

    if (profiles.error) {
      return dispatch({
        type: "SUGGESTIONS_ERROR",
        payload: profiles.error,
      });
    }

    dispatch({
      type: "SUGGESTIONS",
      payload: profiles.suggestions,
    });
  };
};

export const initProfile = (username, config) => {
  return async (dispatch) => {
    const userProfile = await usersService.getUser(username, config);

    if (userProfile.profile) {
      return dispatch({
        type: "PROFILE_TO_VIEW",
        payload: userProfile.profile,
      });
    }

    // object will contain error property that will be checked in the requesting page
    dispatch({
      type: "PROFILE_TO_VIEW",
      payload: userProfile,
    });
  };
};

export const editUser = (profilePic, name, biography, username, config) => {
  return async (dispatch) => {
    // only upload image if its different from the current profile picture
    const imageUrl = profilePic
      ? await usersService.uploadImage(profilePic, config)
      : { url: "" };

    if (imageUrl.error) {
      return dispatch({
        type: "SET_USER_ERROR",
        payload: imageUrl.error,
      });
    }
    const edits = { profilePic: imageUrl.url, name, biography };
    const editedUser = await usersService.updateUserProfile(
      username,
      edits,
      config
    );

    if (editedUser.error) {
      return dispatch({
        type: "SET_USER_ERROR",
        payload: editedUser.error,
      });
    }

    dispatch({
      type: "EDIT_USER_PROFILE",
      payload: editedUser,
    });
  };
};

export const clearSuccess = () => {
  return {
    type: "CLEAR_USER_SUCCESS",
    payload: false,
  };
};

export const clearError = () => {
  return {
    type: "CLEAR_USER_ERROR",
    payload: "",
  };
};

export const initExplorePosts = (username, config) => {
  return async (dispatch) => {
    const explorePosts = await usersService.getExplorePosts(username, config);

    if (explorePosts.error) {
      return dispatch({
        type: "EXPLORE_POSTS_ERROR",
        payload: explorePosts.error,
      });
    }

    dispatch({
      type: "EXPLORE_POSTS",
      payload: explorePosts.posts,
    });
  };
};

export default userReducer;
