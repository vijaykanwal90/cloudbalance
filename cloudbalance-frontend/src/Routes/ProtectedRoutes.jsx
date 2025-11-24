import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "../components/dashboard-components/Users";
import Module from "../components/dashboard-components/Module";
import Dashboard from "../pages/Dashboard";
import DashboardGrid from "../components/dashboard-components/DashboardGrid";
import ProtectedRoute from "../components/ProtectedRoute";
const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Users />} />

        <Route path="users" element={<Users />} />
        <Route path="module" element={<Module />} />
        <Route path="dashboard-grid" element={<DashboardGrid />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
