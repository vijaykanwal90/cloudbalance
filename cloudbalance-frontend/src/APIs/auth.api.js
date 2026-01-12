import  axiosInstance  from "./axiosInstance"
import {AUTH_SUCCESS, AUTH_FAILURE} from "../redux/actions/action-type"
const loginApi = (data)=>{
      return axiosInstance.post("/auth/login", data);
}
const getCurrentUserApi = ()=>{
      return async (dispatch) => {
//     dispatch({ type: AUTH_LOADING });

    try {
      const res = await axiosInstance.get("/auth/me");
      
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data   
      });
    } catch (error) {
      dispatch({ type: AUTH_FAILURE });
    }
  };

}


const logoutApi = ()=>{

      return axiosInstance.post("/auth/logout");

}
const refreshTokensApi = ()=>{
      console.log("api call for refresh token")
      return axiosInstance.post("/auth/refresh")
}
export {loginApi, getCurrentUserApi,logoutApi, refreshTokensApi}