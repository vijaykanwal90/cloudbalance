import React, { createContext, useState } from 'react';

const SidebarContext = createContext()

export const SidebarContextProvider = ({children})=>{
      const [isCollapased, setisCollapased] = useState(false);

      const toggleisCollapased = ()=>{
        setisCollapased(previsCollapased => !previsCollapased);
      }
    return (
        <SidebarContext.Provider value={{isCollapased,toggleisCollapased}}>
            {children}
        </SidebarContext.Provider>
    )
}
export { SidebarContext };