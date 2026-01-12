import React, { useEffect, useState } from "react";
import CostGraphs from "../cost-explorer-components/CostGraphs";
import CostGroupBy from "../cost-explorer-components/CostGroupBy";
import CostTable from "../cost-explorer-components/CostTable";
import CostHeader from "../cost-explorer-components/CostHeader";
import SideFilter from "../cost-explorer-components/SideFilter";
import { getCostByFiltersApi } from "../../APIs/cost.api";

const CostExplorer = () => {
  const [sideFilterOpen, setSideFilterOpen] = useState(false);
  const [filter,setFilter] = useState(null)
  const [costData,setCostData] =  useState(null)

   const filterList = [
  { key: "SERVICE", label: "Service" },
  { key: "INSTANCE_TYPE", label: "Instance Type" },
  { key: "ACCOUNT_ID", label: "Account ID" },
  { key: "USAGE_TYPE", label: "Usage Type" },
  { key: "PLATFORM", label: "Platform" },
  { key: "REGION", label: "Region" },
  { key: "PURCHASE_OPTION", label: "Purchase Option" },
  { key: "RESOURCE", label: "Resource" },
  { key: "AVAILABILITY_ZONE", label: "Availability Zone" },
  { key: "TENANCY", label: "Tenancy" },
  { key: "LEGAL_ENTITY", label: "Legal Entity" },
  { key: "BILLING_ENTITY", label: "Billing Entity" },
];
 useEffect(()=>{
      const fetchCosts = async()=>{
          const res = await getCostByFiltersApi(filter)
          setCostData(res.data)
      }
      if(!costData){
      fetchCosts()

      }
 },[costData])
 if(!costData){
  return (
    <>
    loading...
    </>
  )
 }

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
              <CostGraphs costData={costData} />
            </div>
            
            <div className="my-2 text-center text-blue-900 bg-blue-200 h-16 border border-blue-800 flex items-center justify-center rounded-sm">
              <p>We are showing up top 1000 records by cost.</p>
            </div>
            
            <div>
              <CostTable costData={costData} />
            </div>
          </div>
          
         
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