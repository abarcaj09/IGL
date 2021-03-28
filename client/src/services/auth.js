import axios from "axios";

const baseUrl = "https://igl-server.herokuapp.com/api/auth";

const register = async (userInfo) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, userInfo);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const login = async (userCredentials) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, userCredentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default { register, login };
