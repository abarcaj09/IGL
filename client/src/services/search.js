import axios from "axios";

const baseUrl = "https://igl-server.herokuapp.com/api/search";

const searchUsers = async (searchInput) => {
  try {
    // search for users by name and username
    const response = await axios.get(
      `${baseUrl}/users?name=${searchInput}&username=${searchInput}`
    );
    return response.data.results;
  } catch (error) {
    return [];
  }
};

const searchService = { searchUsers };

export default searchService;
