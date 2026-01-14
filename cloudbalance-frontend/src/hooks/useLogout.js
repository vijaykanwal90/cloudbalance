
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/actions/auth-action";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const logout = async () => {
       dispatch(removeUser())
         navigate("/login", { replace: true });
  };

  return logout;
};
