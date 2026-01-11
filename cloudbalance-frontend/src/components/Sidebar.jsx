import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import PersonIcon from "@mui/icons-material/Person";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux";
import { all } from "axios";
const sidebarList = [
  {
    id: 1,
    icon: <PersonIcon />,
    path: "/dashboard/user-management",
    label: "User Management",
    allowedRoles: ["ADMIN", "READ_ONLY"],
  },
  {
    id: 2,
    icon: <ViewModuleIcon />,
    path: "/dashboard/onboarding",
    label: "Onboarding",
    allowedRoles: ["ADMIN"],
  },
  {
    id: 3,
    icon: <DashboardIcon />,
    path: "/dashboard/cost-explorer",
    label: "Cost Explorer",
    allowedRoles: ["ADMIN", "READ_ONLY", "CUSTOMER"],
  },
  {
    id: 4,
    icon: <DashboardIcon />,
    path: "/dashboard/aws-services",
    label: "AWS Services ",
    allowedRoles: ["ADMIN", "READ_ONLY", "CUSTOMER"],
  },
];

const Sidebar = () => {
  const { isCollapased } = useContext(SidebarContext);
  const { user, isAuthenticated, loading } = useSelector((data) => {
    console.log(data.auth, "here in navbar");
    return data.auth;
  });

  const filteredSidebarList = sidebarList.filter((item) =>
    item.allowedRoles.includes(user?.role)
  );
  return (
    <>
      <div
        className={`${isCollapased ? " w-20" : " opacity-100 w-64"}
        } bg-white  z-10 border-r-2 border-gray-500 relative h-full transition-all duration-300 ease-in-out whitespace-nowrap
    overflow-hidden `}
      >
        <ul className="flex flex-col px-2 gap-2 py-2">
          {filteredSidebarList.map((item) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-sky-200" : "bg-white"
                } text-gray-700 px-3 py-2 rounded flex items-center gap-2`
              }
              key={item.id}
            >
              {item.icon}
              <span className={isCollapased ? "hidden" : ""}>{item.label}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
