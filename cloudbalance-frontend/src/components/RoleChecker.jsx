import { Navigate, Outlet } from "react-router-dom";

const RoleChecker = ({ allowedRoles, userRole }) => {
  const isAuthorized = allowedRoles.includes(userRole);

  if (!isAuthorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; 
};
export default RoleChecker;