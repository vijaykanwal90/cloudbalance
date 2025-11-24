import React, {useContext} from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { MdOutlineInfo } from "react-icons/md";
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarContextProvider } from "../context/SidebarContext";
import { SidebarContext } from "../context/SidebarContext";
import CloseIcon from '@mui/icons-material/Close';
const Navbar = () => {
    const {isCollapased, toggleisCollapased} = useContext(SidebarContext)
  
  return (
    <div className="w-full relative flex justify-between py-4 px-6 shadow-gray-300 shadow-lg overflow-visible z-30">
      <div className="flex items-center gap-6 z-30">
        <div className="mx-auto relative">
          <img src="/cloudkeeper_logo.svg" alt="Cloudkeeper" />
        </div>
        <button className="text-sky-700" onClick={toggleisCollapased} >
          {isCollapased ? <MenuIcon/> : <CloseIcon/>}
          {/* <isCollapasedIcon /> */}
        </button>
        <div className="flex flex-col">
          <label htmlFor="account">Account</label>
          <select name="account" id="account">
            <option value="aws-1">aws-1</option>
            <option value="aws-2">aws-2</option>
            <option value="aws-3">aws-3</option>
          </select>
        </div>
      </div>
      <div className="flex  justify-between  gap-12 text-sky-700">
        <div className="flex gap-4">
          <span className="border-2 rounded-full w-10 h-10 px-auto text-center">
            <PeopleAltIcon sx={{ width: 40, height: 30, padding: '2px 4px' }} />

          </span>
          <main className="flex flex-col leading-1 ">
            <p className="text-base/5">Welcome,</p>
            <span className="flex items-center gap-2 font-bold ">
              <p>Vijay Kanwal</p>
              <MdOutlineInfo />
            </span>
          </main>
        </div>

        <button className="text-sky-700 border-3 rounded-md px-2 font-bold">
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
