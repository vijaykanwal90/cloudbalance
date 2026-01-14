import React, { createContext, useState } from 'react';

const SidebarContext = createContext()

export const SidebarContextProvider = ({children})=>{
      const [isCollapsed, setisCollapsed] = useState(false);

      const toggleisCollapsed = ()=>{
        setisCollapsed(previsCollapsed => !previsCollapsed);
      }
    return (
        <SidebarContext.Provider value={{isCollapsed,toggleisCollapsed}}>
            {children}
        </SidebarContext.Provider>
    )
}
export { SidebarContext };