import postsService from "../services/posts";

const initialState = {
  post: null, // post created by the current user
  error: "",
  creationSuccess: false,

  postToView: null, // when url = /p/:id => a single post

  userPreviews: [], // when url = /p/:id => previews of posts from the user who created postToView
  userPreviewsLoaded: false,
  userPreviewsError: "",

  // the user's like, saved, and created posts
  userLikes: [],
  userSaved: [],
  userPosts: [],
};

// setLikes, setSaved, deletePost
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    // from user reducer
    case "SET_USER":
      // only interested in the post object's  id
      const saved = action.payload.saved.map((post) => post.id);
      return {
        ...state,
        userLikes: action.payload.likes,
        userSaved: saved,
        userPosts: action.payload.posts,
      };
    case "CREATE_POST":
      return {
        ...state,
        post: action.payload,
        error: "",
        creationSuccess: true,
      };
    case "CREATE_POST_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_POST_ERROR":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return initialState;
    case "INIT_POST_TO_VIEW":
      return { ...state, postToView: action.payload };
    case "INIT_USER_PREVIEWS":
      return {
        ...state,
        userPreviews: action.payload,
        userPreviewsLoaded: true,
        userPreviewsError: "",
      };
    case "INIT_USER_PREVIEWS_ERROR":
      return {
        ...state,
        userPreviewsError: action.payload,
        userPreviews: [],
        userPreviewsLoaded: true,
      };
    case "REMOVE_POST":
      return { ...state, userSaved: action.payload };
    case "REMOVE_CREATED_POST":
      return { ...state, post: null, userSaved: action.payload };
    case "LIKE_POST":
      return { ...state, userLikes: action.payload };
    case "LIKE_POST_ERROR":
      return state;
    case "SAVE_POST":
      return { ...state, userSaved: action.payload };
    case "SAVE_POST_ERROR":
      return state;
    case "CLEAR_SUCCESS":
      return { ...state, creationSuccess: action.payload };
    default:
      return state;
  }
};

export const createPost = (images, caption, config) => {
  return async (dispatch) => {
    const imageUrls = await postsService.uploadImages(images, config);

    if (imageUrls.error) {
      return dispatch({
        type: "CREATE_POST_ERROR",
        payload: imageUrls.error,
      });
    }

    const savedPost = await postsService.newPost(
      imageUrls.urls,
      caption,
      config
    );

    if (savedPost.error) {
      return dispatch({
        type: "CREATE_POST_ERROR",
        payload: savedPost.error,
      });
    }

    dispatch({
      type: "CREATE_POST",
      payload: savedPost.post,
    });
  };
};

export const clearPostError = () => {
  return {
    type: "CLEAR_POST_ERROR",
    payload: "",
  };
};

export const initPost = (id) => {
  return async (dispatch) => {
    const postToView = await postsService.getPost(id);

    dispatch({
      type: "INIT_POST_TO_VIEW",
      payload: postToView.post,
    });
  };
};

export const initUserPreviews = (username) => {
  return async (dispatch) => {
    const posts = await postsService.getUserPreviews(username);

    if (posts.error) {
      return dispatch({
        type: "INIT_USER_PREVIEWS_ERROR",
        payload: posts.error,
      });
    }

    dispatch({
      type: "INIT_USER_PREVIEWS",
      payload: posts.previews,
    });
  };
};

export const removePost = (id, config, newUserSaved) => {
  return async (dispatch) => {
    await postsService.deletePost(id, config);

    dispatch({
      type: "REMOVE_POST",
      payload: newUserSaved,
    });
  };
};

export const removeCreatedPost = (newUserSaved) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_CREATED_POST",
      payload: newUserSaved,
    });
  };
};

export const likePost = (id, config) => {
  return async (dispatch) => {
    const self = await postsService.likePost(id, config);

    if (self.error) {
      return dispatch({
        type: "LIKE_POST_ERROR",
        payload: null,
      });
    }

    dispatch({
      type: "LIKE_POST",
      payload: self.userLikes,
    });
  };
};

export const savePost = (id, config) => {
  return async (dispatch) => {
    const self = await postsService.savePost(id, config);

    if (self.error) {
      return dispatch({
        type: "SAVE_POST_ERROR",
        payload: null,
      });
    }

    dispatch({
      type: "SAVE_POST",
      payload: self.userSaved,
    });
  };
};

export const clearSuccess = () => {
  return {
    type: "CLEAR_SUCCESS",
    payload: false,
  };
};

export default postsReducer;
