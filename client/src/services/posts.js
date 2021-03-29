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

const create = async (imageUrls, caption, config) => {
  try {
    const postContent = { imageUrls, caption };
    const response = await axios.post(`${baseUrl}/`, postContent, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default {
  uploadImages,
  create,
};
