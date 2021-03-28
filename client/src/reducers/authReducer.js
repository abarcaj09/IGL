import authService from "../services/auth";
import { getConfig } from "../utils";

const initialState = {
  user: null, // object contains username and jwt
  error: null,
  config: null, // contains Authorization header with jwt
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userJWT", action.payload.token);
      return {
        ...state,
        user: action.payload,
        error: null,
        config: getConfig(action.payload.token),
      };

    case "ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const register = (userInfo) => {
  return async (dispatch) => {
    const registeredUser = await authService.register(userInfo);

    if (registeredUser.error) {
      return dispatch({
        type: "ERROR",
        payload: registeredUser.error,
      });
    }

    dispatch({
      type: "LOGIN",
      payload: registeredUser,
    });
  };
};

export default authReducer;
