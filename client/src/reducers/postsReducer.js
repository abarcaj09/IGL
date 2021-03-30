import postsService from "../services/posts";

const initialState = {
  post: null, // post created by the current user
  error: "",
  creationSuccess: false,

  postToView: null, // when url = /p/:id => a single post

  userPosts: [], // when url = /p/:id => previews of posts from the user who created postToView
  userPostsLoaded: false,
  userPostsError: "",

  // the user's like, saved, and created posts
  userLikes: [],
  userSaved: [],
  userCreatedPosts: [],
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

export default postsReducer;
