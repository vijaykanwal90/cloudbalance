import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Users from '../components/dashboard-components/Users'
import Module from '../components/dashboard-components/Module'
import DashboardGrid from '../components/dashboard-components/DashboardGrid'
const ProtectedRoutes = () => {
  return (
    <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path='/module' element={<Module/>}/>
        <Route path='/dashboard-grid' element={<DashboardGrid/>}/>

            
    </Routes>
  )
}

export default ProtectedRoutes