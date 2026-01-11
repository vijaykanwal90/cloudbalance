import { useEffect } from "react";
import RoleChecker from "../components/RoleChecker";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserTable from "../components/UserManagement/UserTable";
import { useSelector,useDispatch } from "react-redux";
import { getCurrentUserApi } from "../APIs/auth.api";
import AccountManagement from "../components/account-components/AccountManagement"
import UserManagement from "../components/dashboard-components/UserManagement";
import CostExplorer from "../components/dashboard-components/CostExplorer";
import UserForm from "../components/UserManagement/UserForm";
import UserFormLayout from "../components/UserManagement/UserFormLayout";
import Onboarding from "../components/Onboarding-components/Onboarding";
import AccountOnboarding from "../components/Onboarding-components/AccountOnboarding";
import AWSServices from "../components/dashboard-components/AWSServices";
const ProtectedRoutes = () => {
  const { user, isAuthenticated, loading } = useSelector((data) => {
    console.log(data.auth, "here in navbar");
    return data.auth;
  });
  const dispatch = useDispatch()
useEffect(()=>{
      if(!user){
        dispatch(getCurrentUserApi());
      }
  },[user])
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<UserTable />} />
        
        <Route element={<RoleChecker userRole={user?.role} allowedRoles={['ADMIN']} />}>
          <Route path="user-management" element={<UserManagement/>}>
            <Route index element={<UserTable />} />
            <Route path="adduser" element={<UserFormLayout />} />
            <Route path="edituser/:id" element={<UserFormLayout/>} />
          </Route>
          <Route path="onboarding" element={<Onboarding/>} />
          <Route path="onboarding/link-account" element={<AccountOnboarding/>} />
        </Route>

        <Route element={<RoleChecker userRole={user?.role} allowedRoles={['ADMIN', 'READ_ONLY']} />}>
          <Route path="assign-account/:id" element={<AccountManagement />} />
          <Route path="assign-account" element={<AccountManagement />} />
        </Route>

        <Route path="cost-explorer" element={<CostExplorer/>} />
        <Route path="aws-services" element={<AWSServices/>} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes