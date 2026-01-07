
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../APIs/auth.api";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
        try {
     const res = await logoutApi()
  
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return logout;
};
