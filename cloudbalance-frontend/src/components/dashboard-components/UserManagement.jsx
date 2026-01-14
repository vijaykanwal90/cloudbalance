import { Outlet } from "react-router-dom";

const UserManagement = () => {
  return (
    <div className="pl-4 mt-4 h-full">
      <Outlet />
    </div>
  );
};

export default UserManagement;
