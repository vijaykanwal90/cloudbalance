// axiosInstance.js
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { logoutApi , refreshTokensApi} from "./auth.api";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor here
axiosInstance.interceptors.response.use(
  // Success handler
  response => response,

  // Error handler
  async error => {
    const originalRequest = error.config;
    console.log("Interceptor triggered:", originalRequest);
    
    if (!originalRequest) return Promise.reject(error);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Import here to avoid circular dependency
        await refreshTokensApi();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // await logoutApi();
        // console.log("refresh token is expired as well")
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;