import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { logoutApi, refreshTokensApi } from "./auth.api";
import { redirectToLogin } from "../utils/redirectToLogin";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
     console.log(originalRequest)
    if (!originalRequest) {
      redirectToLogin();
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      originalRequest.url?.includes("/auth/logout")
    ) {
     
      redirectToLogin();
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await refreshTokensApi();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        
          await logoutApi();
       

        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
