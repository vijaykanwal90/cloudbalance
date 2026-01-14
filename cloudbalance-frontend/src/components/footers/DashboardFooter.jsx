import React, {useContext} from 'react'
import { SidebarContext } from '../../context/SidebarContext'

const DashboardFooter = () => {
  const {isCollapsed} = useContext(SidebarContext)
  console.log(isCollapsed)
  return (
     <div className={`${isCollapsed ? "w-full" : "w-[80%]"} transition-all duration-300 w-full flex justify-between  fixed bg-blue-200 bottom-0 px-16  py-2 z-30`}>

      
      <span className=''>Cloudkeeper 2025 | All Rights Reserved</span>
      <span className={`${isCollapsed ? "mr-8" : "mr-64"} transition-all duration-300`}>
        Contact Us
      </span>
    </div>
  )
}

export default DashboardFooter