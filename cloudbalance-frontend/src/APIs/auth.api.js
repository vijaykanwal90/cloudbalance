import axiosInstance from "./axiosInstance";
const loginApi = (data) => {
  return axiosInstance.post("/auth/login", data);
};
const getCurrentUserApi = () => {
  return axiosInstance.get("/auth/me");
};

const logoutApi = () => {
  return axiosInstance.post("/auth/logout");
};
const refreshTokensApi = () => {
  console.log("api call for refresh token");
  return axiosInstance.post("/auth/refresh");
};
export { loginApi, getCurrentUserApi, logoutApi, refreshTokensApi };
