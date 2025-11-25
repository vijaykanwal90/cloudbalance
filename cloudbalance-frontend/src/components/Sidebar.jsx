import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import PersonIcon from "@mui/icons-material/Person";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import DashboardIcon from "@mui/icons-material/Dashboard";
const sidebarList = [
  {
    id: 1,
    icon: <PersonIcon />,
    path: "/dashboard/user-management",
    label: "User Management",
  },
  {
    id: 2,
    icon: <ViewModuleIcon />,
    path: "/dashboard/onboarding",
    label: "Onboarding",
  },
  {
    id: 3,
    icon: <DashboardIcon />,
    path: "/dashboard/cost-explorer",
    label: "Cost Explorer",
  },
  {
    id: 4,
    icon: <DashboardIcon />,
    path: "/dashboard/aws-services",
    label: "AWS Services ",
  },
];

const Sidebar = () => {
  const { isCollapased } = useContext(SidebarContext);
  return (
    <>
      <div
        className={`${
          !isCollapased && "w-full"
        } bg-white  z-10 border-r-2 border-gray-500 relative h-full `}
      >
        <ul className="flex flex-col px-2 gap-2 py-2">
          {sidebarList.map((item) => {
            return (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-sky-200" : "bg-white"
                  } text-gray-700 px-3 py-2 rounded`
                }
                key={item.id}
              >
                {item.icon}

                <span className={isCollapased ? "hidden" : ""}>{item.label}</span>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
