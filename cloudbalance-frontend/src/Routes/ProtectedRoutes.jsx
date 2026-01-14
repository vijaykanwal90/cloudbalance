import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../redux/actions/auth-action";

import RoleChecker from "../components/RoleChecker";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import UserManagement from "../components/dashboard-components/UserManagement";
import UserTable from "../components/UserManagement/UserTable";
import UserFormLayout from "../components/UserManagement/UserFormLayout";
import Onboarding from "../components/Onboarding-components/Onboarding";
import AccountOnboarding from "../components/Onboarding-components/AccountOnboarding";
import CostExplorer from "../components/dashboard-components/CostExplorer";
import AWSServices from "../components/dashboard-components/AWSServices";

const ProtectedRoutes = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Only fetch once if no user
  useEffect(() => {
  if (!user) {
    dispatch(fetchCurrentUser());
  }
}, [dispatch]);

console.log(user)
 
  if (!user) return <Navigate to="/login" replace />;

  const defaultPage =
    user.role === "CUSTOMER" ? "/dashboard/cost-explorer" : "/dashboard/user-management";

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Navigate to={defaultPage} replace />} />

        {/* Admin & Read Only */}
        <Route element={<RoleChecker userRole={user.role} allowedRoles={["ADMIN", "READ_ONLY"]} />}>
          <Route path="user-management" element={<UserManagement />}>
            <Route index element={<UserTable />} />
            <Route element={<RoleChecker userRole={user.role} allowedRoles={["ADMIN"]} />}>
              <Route path="adduser" element={<UserFormLayout />} />
              <Route path="edituser/:id" element={<UserFormLayout />} />
            </Route>
          </Route>

          <Route path="onboarding" element={<Onboarding />} />
          <Route element={<RoleChecker userRole={user.role} allowedRoles={["ADMIN"]} />}>
            <Route path="onboarding/link-account" element={<AccountOnboarding />} />
          </Route>
        </Route>

        {/* All roles */}
        <Route
          element={
            <RoleChecker
              userRole={user.role}
              allowedRoles={["ADMIN", "READ_ONLY", "CUSTOMER"]}
            />
          }
        >
          <Route path="cost-explorer" element={<CostExplorer />} />
          <Route path="aws-services" element={<AWSServices />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProtectedRoutes;
