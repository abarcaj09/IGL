export const getConfig = (userToken) => {
  const authToken = `Bearer ${userToken}`;
  const config = {
    headers: { Authorization: authToken },
  };
  return config;
};
