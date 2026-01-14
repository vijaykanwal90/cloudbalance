import React, { useEffect, useState } from "react";
import CostGraphs from "../cost-explorer-components/CostGraphs";
import CostGroupBy from "../cost-explorer-components/CostGroupBy";
import CostTable from "../cost-explorer-components/CostTable";
import CostHeader from "../cost-explorer-components/CostHeader";
import SideFilter from "../cost-explorer-components/SideFilter";
import { getCostByFiltersApi } from "../../APIs/cost.api";
import { useDispatch, useSelector } from "react-redux";
import { addToQuery } from "../../redux/actions/query-action";

// import { data } from "react-router-dom";
const CostExplorer = () => {
  const [sideFilterOpen, setSideFilterOpen] = useState(false);
  // const [query,setQuery] = useState({group: "SERVICE"})
  const [costData, setCostData] = useState(null);
  const query = useSelector((state) => {
    return state.query;
  });
  const dispatch = useDispatch();
  const filterList = [
    { key: "SERVICE" },
    { key: "INSTANCE_TYPE" },
    { key: "ACCOUNT_ID" },
    { key: "USAGE_TYPE" },
    { key: "PLATFORM" },
    { key: "REGION" },
    { key: "PURCHASE_OPTION" },
    { key: "RESOURCE" },
    { key: "AVAILABILITY_ZONE" },
    { key: "TENANCY" },
    { key: "LEGAL_ENTITY" },
    { key: "BILLING_ENTITY" },
  ];
  useEffect(() => {
    dispatch(
      addToQuery({
        group: "SERVICE",
      })
    );
  }, []);
  useEffect(() => {
   
    const fetchCosts = async () => {
      console.log(query)
      const res = await getCostByFiltersApi(query);
      setCostData(res.data);
    };

    fetchCosts();
  }, [query]);
  if (!costData) {
    return <>loading...</>;
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
              <p>Here  we are showing Cost of records.</p>
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
