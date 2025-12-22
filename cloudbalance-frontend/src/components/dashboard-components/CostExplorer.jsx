import React, { useState } from "react";
import CostGraphs from "../cost-explorer-components/CostGraphs";
import CostGroupBy from "../cost-explorer-components/CostGroupBy";
import CostTable from "../cost-explorer-components/CostTable";
import CostHeader from "../cost-explorer-components/CostHeader";
import SideFilter from "../cost-explorer-components/SideFilter";

const CostExplorer = () => {
  const [sideFilterOpen, setSideFilterOpen] = useState(false);
  
  const filterList = [
    "service",
    "instantType",
    "accountId",
    "usageType",
    "platform",
    "region",
    "Region",
    "Purchase Option",
    "Resource",
    "Charge Type",
    "Availability Zone",
    "Tenancy",
    "Legal Entity",
    "Billing Entity",
  ];

  return (
    <div className="mb-8 w-full h-full">
      <div>
        <CostHeader />
      </div>
      
      <div className="bg-[#F8F8F8] mx-6 my-6 py-4 rounded-md border border-slate-400">
        <CostGroupBy
          sideFilterOpen={sideFilterOpen}
          setSideFilterOpen={setSideFilterOpen}
          filterList={filterList}
        />
        
        <div className="flex justify-between mx-4 bg-white">
          <div className="min-w-0 flex flex-col flex-1 transition-all duration-300 ease-in-out mx-4">
            <div>
              <CostGraphs />
            </div>
            
            <div className="my-2 text-center text-blue-900 bg-blue-200 h-16 border border-blue-800 flex items-center justify-center rounded-sm">
              <p>We are showing up top 1000 records by cost.</p>
            </div>
            
            <div>
              <CostTable />
            </div>
          </div>
          
          {/* Side Filter with smooth transition */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden shrink-0 ${
              sideFilterOpen ? "w-72 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="w-72">
              <SideFilter filterList={filterList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostExplorer;