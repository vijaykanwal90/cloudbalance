import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "../components/dashboard-components/UserManagement";
import Dashboard from "../pages/Dashboard";
import Onboarding from "../components/dashboard-components/Onboarding";
import CostExplorer from "../components/dashboard-components/CostExplorer";
import AWSServices from "../components/dashboard-components/AWSServices";
import UserManagement from "../components/dashboard-components/UserManagement";
import UserFormLayout from "../components/UserManagement/UserFormLayout";
import UserTable from "../components/UserManagement/UserTable";
// const routesList = [
//   {
//     id: 1,
//     element: <UserManagement />,
//     path: "user-management",
//     label: "Users",
//     childrens: [
//       {
//         id: 1,
//         element: <UserManagement />,
//         path: "user-management",
//         label: "Users",
//       },
//       {
//         id: 1,
//         element: <UserManagement />,
//         path: "user-management",
//         label: "Users",
//       },
//     ],
//   },
//   {
//     id: 2,
//     element: <Onboarding />,
//     path: "onboarding",
//     label: "Onboarding",
//   },
//   {
//     id: 3,
//     element: <CostExplorer />,
//     path: "cost-explorer",
//     label: "Cost Explorer",
//   },
//   {
//     id: 4,
//     element: <AWSServices />,
//     path: "aws-services",
//     label: "AWS Services ",
//   },
// ];
const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<UserTable />} />
        {/* {routesList.map((route) => {
          return (
            <Route key={route.id} path={route.path} element={route.element} />
          );
        })} */}
        <Route path="user-management" element={<UserManagement/>}>
          <Route index element={<UserTable/>}/>

          <Route path="user-table" element={<UserTable/>}/>

          <Route path="adduser" element={<UserFormLayout/>}/>
          <Route path="edituser/:id" element={<UserFormLayout/>}/>


        </Route>
        <Route>
          <Route path="onboarding" element={<Onboarding/>}/>

        </Route>
        <Route>
          <Route path="cost-explorer" element={<CostExplorer/>}/>

        </Route>
        <Route>
          <Route path="aws-services" element={<AWSServices/>}/>
        </Route>
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
