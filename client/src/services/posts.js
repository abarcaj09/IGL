import axios from "axios";

const baseUrl = "https://igl-server.herokuapp.com/api/posts";

const uploadImages = async (images, config) => {
  try {
    const response = await axios.post(`${baseUrl}/images`, images, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const newPost = async (imageUrls, caption, config) => {
  try {
    const postContent = { imageUrls, caption };
    const response = await axios.post(`${baseUrl}/`, postContent, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getPost = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getUserPreviews = async (username) => {
  try {
    const response = await axios.get(`${baseUrl}/${username}/previews`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deletePost = async (id, config) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const likePost = async (id, config) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/likes`, {}, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const savePost = async (id, config) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/save`, {}, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const postsService = {
  uploadImages,
  newPost,
  getPost,
  getUserPreviews,
  deletePost,
  likePost,
  savePost,
};

export default postsService;
