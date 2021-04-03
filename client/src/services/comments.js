import axios from "axios";

const baseUrl = "https://igl-server.herokuapp.com/api/comments";

const newComment = async (commentObj, config) => {
  try {
    const response = await axios.post(baseUrl, commentObj, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteComment = async (id, config) => {
  try {
    const response = axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const commentService = { newComment, deleteComment };

export default commentService;
