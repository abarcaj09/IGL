import authService from "../services/auth";
import { getConfig } from "../utils";
import jwt_decode from "jwt-decode";

const initialState = {
  user: null, // object contains username and jwt
  loginError: "",
  registerError: null,
  config: null, // contains Authorization header with jwt
};

const storedJWT = localStorage.getItem("userJWT");
if (storedJWT) {
  const decodedToken = jwt_decode(storedJWT);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("userJWT");
  } else {
    // set user and authHeader if valid jwt is stored
    initialState.user = {
      token: storedJWT,
      username: decodedToken.username,
    };
    initialState.config = getConfig(storedJWT);
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userJWT", action.payload.token);
      return {
        ...state,
        user: action.payload,
        loginError: "",
        registerError: null,
        config: getConfig(action.payload.token),
      };
    case "LOGOUT":
      localStorage.removeItem("userJWT");
      return action.payload;
    case "LOGIN_ERROR":
      return { ...state, loginError: action.payload };
    case "REGISTER_ERROR":
      return { ...state, registerError: action.payload };
    default:
      return state;
  }
};

export const register = (userInfo) => {
  return async (dispatch) => {
    const registeredUser = await authService.register(userInfo);

    if (registeredUser.error) {
      return dispatch({
        type: "REGISTER_ERROR",
        payload: registeredUser.error,
      });
    }

    dispatch({
      type: "LOGIN",
      payload: registeredUser,
    });
  };
};

export const login = (userCredentials) => {
  return async (dispatch) => {
    const authUser = await authService.login(userCredentials);

    if (authUser.error) {
      return dispatch({
        type: "LOGIN_ERROR",
        payload: authUser.error,
      });
    }

    dispatch({
      type: "LOGIN",
      payload: authUser,
    });
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: { user: null, loginError: "", registerError: null, config: null },
  };
};

export default authReducer;
