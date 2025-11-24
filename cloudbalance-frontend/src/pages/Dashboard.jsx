import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardFooter from "../components/footers/DashboardFooter";
import { Outlet } from "react-router-dom";
import {
  SidebarContext,
  SidebarContextProvider,
} from "../context/SidebarContext";
import Breadcrumb from "../BreadCrums/BreadCrum";
const Dashboard = () => {
  
  return (
    <>
      <SidebarContextProvider>
        <Navbar />
        <div className="flex">
          <div className="flex-none">
            <Sidebar />
          </div>

          <div className=" h-screen bg-slate-300 py-4  grow">
            <div className="w-full">
              <Breadcrumb/>
            <Outlet />
            <DashboardFooter />
            </div>
          </div>
        </div>
      </SidebarContextProvider>
    </>
  );
};

export default Dashboard;
