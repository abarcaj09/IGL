import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import postsReducer from "./reducers/postsReducer";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
