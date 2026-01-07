// import { logoutApi, refreshTokensApi } from "./auth.api";
// import axiosInstance from "./axiosInstance";

// axiosInstance.interceptors.response.use(
//   // Success handler
//   response => response,

//   // Error handler
//   async error => {
//     const originalRequest = error.config;
//     console.log(originalRequest)
//     if (!originalRequest) return Promise.reject(error);

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/refresh")
//     ) {
//       originalRequest._retry = true;

//       try {
//         await refreshTokensApi();
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         await logoutApi();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
  
// ) ;
