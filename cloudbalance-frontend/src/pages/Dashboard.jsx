import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardFooter from "../components/footers/DashboardFooter";
import { Outlet } from "react-router-dom";
import {
  SidebarContext,
  SidebarContextProvider,
} from "../context/SidebarContext";
const Dashboard = () => {
  return (
    <div className="">
      <SidebarContextProvider>
        <Navbar />
        <div className="flex">
          <div className="flex-none">
            <Sidebar />
          </div>

          <div className=" h-screen bg-slate-300 py-4  grow">
            <div className="w-full">
            {/* <Outlet /> */}
            <DashboardFooter />
            </div>
          </div>
        </div>
      </SidebarContextProvider>
    </div>
  );
};

export default Dashboard;
