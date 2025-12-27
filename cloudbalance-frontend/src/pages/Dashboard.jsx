import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardFooter from "../components/footers/DashboardFooter";
import { Outlet } from "react-router-dom";
import {
  SidebarContext,
  SidebarContextProvider,
} from "../context/SidebarContext";
import Breadcrumb from "../BreadCrums/BreadCrum";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import { addUser,removeUser } from "../redux/actions/user-action";
import { useDispatch,useSelector } from "react-redux";
const Dashboard = () => {
        const dispatch = useDispatch()
  const fetchUser = async()=>{
       const res = await axios.get(`${BASE_URL}/auth/me`,{
        withCredentials: true
       })
       console.log(res.data)
       if(res.status===200){
          dispatch(()=>{
            addUser(res.data)
          })
       }
  }

  useEffect(()=>{
        fetchUser()
  },[])
  return (
    <>
      <SidebarContextProvider>
        <Navbar />
        <div className="flex h-screen pt-16">
          <div className="flex-none ">
            <Sidebar />
          </div>

          <div className="overflow-y-auto bg-slate-300 py-4  grow">
            <div className="w-full">
              <Breadcrumb />
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
