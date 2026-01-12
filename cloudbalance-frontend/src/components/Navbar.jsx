import React, { useContext, useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { MdOutlineInfo } from "react-icons/md";
import MenuIcon from "@mui/icons-material/Menu";
import { SidebarContextProvider } from "../context/SidebarContext";
import { SidebarContext } from "../context/SidebarContext";
import CloseIcon from "@mui/icons-material/Close";
import { useLogout } from "../hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { myAccountsApi } from "../APIs/account.api";
import { getCurrentUserApi } from "../APIs/auth.api";
const Navbar = () => {
  // const navigate = useNavigate();
  const { isCollapased, toggleisCollapased } = useContext(SidebarContext);
  const logout = useLogout();
  const dispatch = useDispatch()
  const [userAccounts, setUserAccount] = useState([]);
  const { user, isAuthenticated, loading } = useSelector((data) => {
    return data.auth;
  });
  
  useEffect(()=>{
      if(!user){
        dispatch(getCurrentUserApi());
      }
  },[user])

  useEffect(() => {
    const fetchMyAccounts = async () => {
      const res = await myAccountsApi();
      if (res.status == 200) {
        setUserAccount(res.data);
      }
    };
    if (!userAccounts || userAccounts.length === 0) {
      fetchMyAccounts();
    }
  }, [user]);

  return (
    <div className="w-full fixed top-0 left-0 flex justify-between py-4 px-6 h-16 bg-white shadow-gray-300 shadow-lg  z-30">
      <div className="flex items-center gap-6 z-30">
        <div className="mx-auto relative">
          <img src="/cloudkeeper_logo.svg" alt="Cloudkeeper" />
        </div>
        <button className="text-sky-700" onClick={toggleisCollapased}>
          {isCollapased ? <MenuIcon /> : <CloseIcon />}
          {/* <isCollapasedIcon /> */}
        </button>
        {userAccounts.length > 0  && (
          <div className="flex flex-col">
            <label htmlFor="account">Account</label>
            <select name="account" id="account">
              {/* <option value="aws-1">aws-1</option>
            <option value="aws-2">aws-2</option>
            <option value="aws-3">aws-3</option> */}
              {userAccounts &&
                userAccounts.map((account) => {
                  return (
                    <option key={account.id} value={account.accountId}>
                      {account.accountName}
                    </option>
                  );
                })}
            </select>
          </div>
        )}
      </div>
      <div className="flex  justify-between  gap-12 text-sky-700">
        <div className="flex gap-4">
          <span className="border-2 rounded-full w-10 h-10 px-auto text-center">
            <PeopleAltIcon sx={{ width: 40, height: 30, padding: "2px 4px" }} />
          </span>
          <main className="flex flex-col leading-1 ">
            <p className="text-base/5">Welcome,</p>
            <span className="flex items-center gap-2 font-bold ">
              <p>{user ? `${user.firstName} ${user.lastName}` : ""}</p>

              <MdOutlineInfo />
            </span>
          </main>
        </div>

        <button
          className="text-blue-800 border-2 rounded-md px-2  font-bold cursor-pointer  hover:bg-sky-[#F2F9FF] hover:shadow-md shadow-gray-500 hover:border-transparent  box-border"
          onClick={logout}
        >
          <span>
            <LogoutIcon />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
