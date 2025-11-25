import React  from "react";
import Breadcrumb from "../../BreadCrums/BreadCrum";
import UserTable from "../UserManagement/UserTable";
import AddUser from "../UserManagement/AddUser";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const UserManagement = () => {
  
  return (
    <div className="pl-4 mt-4 h-full">
      

      <Outlet />
    </div>
  );
};

export default UserManagement;
