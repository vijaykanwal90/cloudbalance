import {
 
  REMOVE_USER,
  AUTH_SUCCESS,
} from "./action-type";
import { getCurrentUserApi, logoutApi } from "../../APIs/auth.api";
export const fetchCurrentUser = () => {
    return async (dispatch) => {
    try {
      const res = await getCurrentUserApi();
      console.log(res)
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: REMOVE_USER });
    }
  };
};
export const removeUser = () =>{
    return async (dispatch) => {
    try {
      await logoutApi();
    } finally {
    
      dispatch({ type: REMOVE_USER });
    }
  };
};
export const authSuccess = () => ({ type: AUTH_SUCCESS });
// export const authFailure = () => ({ type: AUTH_FAILURE });
