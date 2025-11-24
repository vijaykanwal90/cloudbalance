import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "../components/dashboard-components/Users";
import Dashboard from "../pages/Dashboard";
import Onboarding from "../components/dashboard-components/Onboarding";
import CostExplorer from "../components/dashboard-components/CostExplorer";
import AWSServices from "../components/dashboard-components/AWSServices";

const routesList = [
  {
    id: 1,
    element: <Users/>,
    path: "users",
    label: "Users",
  },
  {
    id: 2,
    element: <Onboarding/>,
    path: "onboarding",
    label: "Onboarding",
  },
  {
    id: 3,
    element: <CostExplorer/>,
    path: "cost-explorer",
    label: "Cost Explorer",
  },
  {
    id: 4,
    element: <AWSServices/>,
    path: "aws-services",
    label: "AWS Services ",
  },
];
const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Users />} />
        {routesList.map((route) => {
          return <Route key={route.id} path={route.path} element={route.element} />;
        })}
        
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
