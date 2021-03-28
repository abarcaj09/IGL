import axios from "axios";

const baseUrl = "https://igl-server.herokuapp.com/api/users";

const getUser = async (username, config) => {
  try {
    const response = await axios.get(`${baseUrl}/${username}`, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default {
  getUser,
};
