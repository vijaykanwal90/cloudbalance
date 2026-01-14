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
import { myAccountsApi, getAllAccountsApi } from "../APIs/account.api";
import { getCurrentUserApi } from "../APIs/auth.api";
import { addToQuery } from "../redux/actions/query-action";
import { fetchCurrentUser } from "../redux/actions/auth-action";
const Navbar = () => {
  // const navigate = useNavigate();
  const { isCollapsed, toggleisCollapsed } = useContext(SidebarContext);
 const accountId = useSelector((state) => state.query.accountId);


  const query = useSelector((data) => {
    return data.query;
  });
  
  const logout = useLogout();
  const dispatch = useDispatch();
  const [userAccounts, setUserAccount] = useState([]);
  const { user } = useSelector((data) => {
    return data.auth;
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
    
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchAccounts = async () => {
      try {
        const res =
          user.role === "CUSTOMER"
            ? await myAccountsApi()
            : await getAllAccountsApi();

        if (res.status === 200) {
          
          setUserAccount(res.data);
        }
      } catch (error) {
        console.error("Account fetch failed", error);
      }
    };

    fetchAccounts();
  }, [user]);
  useEffect(() => {
    if (userAccounts.length > 0 && !query.accountId) {
      dispatch(
        addToQuery({
          accountId: userAccounts[0].accountId,
        })
      );
    }
  }, [userAccounts, query.accountId, dispatch]);

  return (
    <div className="w-full fixed top-0 left-0 flex justify-between py-4 px-6 h-16 bg-white shadow-gray-300 shadow-lg  z-30">
      <div className="flex items-center gap-6 z-30">
        <div className="mx-auto relative">
          <img src="/cloudkeeper_logo.svg" alt="Cloudkeeper" />
        </div>
        <button className="text-sky-700 cursor-pointer" onClick={toggleisCollapsed}>
          {isCollapsed ? <MenuIcon /> : <CloseIcon />}
          {/* <isCollapsedIcon /> */}
        </button>
        {userAccounts.length > 0 && (
          <div className="flex flex-col">
            <label htmlFor="account">Account</label>
            <select
              name="account"
              id="account"
              value={accountId}
              onChange={(e) =>
                dispatch(addToQuery({ accountId: e.target.value }))
              }
              className="border rounded px-2 py-1"
            >
              {userAccounts.map((account) => (
                <option key={account.id} value={account.accountId}>
                  {account.accountName}
                </option>
              ))}
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
          className="text-sky-700 border-2 rounded-md px-2  font-bold cursor-pointer  hover:bg-sky-[#F2F9FF] hover:shadow-md shadow-gray-500 hover:border-transparent  box-border"
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
