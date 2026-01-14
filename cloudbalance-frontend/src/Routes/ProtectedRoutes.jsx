import { useEffect } from "react";
import RoleChecker from "../components/RoleChecker";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserTable from "../components/UserManagement/UserTable";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserApi } from "../APIs/auth.api";
import AccountManagement from "../components/account-components/AccountManagement";
import UserManagement from "../components/dashboard-components/UserManagement";
import CostExplorer from "../components/dashboard-components/CostExplorer";
import UserForm from "../components/UserManagement/UserForm";
import UserFormLayout from "../components/UserManagement/UserFormLayout";
import Onboarding from "../components/Onboarding-components/Onboarding";
import AccountOnboarding from "../components/Onboarding-components/AccountOnboarding";
import AWSServices from "../components/dashboard-components/AWSServices";
import NotFound from "../pages/NotFound";
const ProtectedRoutes = () => {
  const { user } = useSelector((data) => {
    return data.auth;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        await dispatch(getCurrentUserApi());
      }
    };
    fetchUser();
  }, []);

  const defaultPage =
    user?.role === "CUSTOMER"
      ? "/dashboard/cost-explorer"
      : "/dashboard/user-management";
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Navigate to={defaultPage} replace />} />

        {/* ADMIN & READ_ONLY */}
        <Route
          element={
            <RoleChecker
              userRole={user?.role}
              allowedRoles={["ADMIN", "READ_ONLY"]}
            />
          }
        >
          <Route path="user-management" element={<UserManagement />}>
            <Route index element={<UserTable />} />

            {/* ADMIN ONLY */}
            <Route
              element={
                <RoleChecker userRole={user?.role} allowedRoles={["ADMIN"]} />
              }
            >
              <Route path="adduser" element={<UserFormLayout />} />
              <Route path="edituser/:id" element={<UserFormLayout />} />
            </Route>
          </Route>

          {/* ONBOARDING (outside user-management) */}
          <Route path="onboarding" element={<Onboarding />} />

          {/* ADMIN ONLY */}
          <Route
            element={
              <RoleChecker userRole={user?.role} allowedRoles={["ADMIN"]} />
            }
          >
            <Route
              path="onboarding/link-account"
              element={<AccountOnboarding />}
            />
          </Route>
        </Route>

        {/* ALL ROLES */}
        <Route
          element={
            <RoleChecker
              userRole={user?.role}
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
