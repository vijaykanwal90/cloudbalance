
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
     console.log("on logout")
        try {
      const res = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
  
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return logout;
};
