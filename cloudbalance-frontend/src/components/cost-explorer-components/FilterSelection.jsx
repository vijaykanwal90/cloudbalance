import React from "react";

const FilterSelection = ({
  filter,
  filterSelectionBox,
  setFilterSectionBox,
  openedFilter,
  setOpenedFilter
}) => {
  const onClose = ()=>{
        setOpenedFilter(null)
      setFilterSectionBox(!filterSelectionBox)
  }
  const subFilters = [
    "Billing Period",
    "Tags",
    "Cost Allocation Tags",
    "Discount Type",
    "Savings Plans",
    "Reserved Instances",
    "Operating System",
    "Environment (Prod/Dev/Test)",
    "Cloud Provider",
    "Data Transfer Type",
    "Storage Class",
    "Pricing Model",
  ];

  return (
    <div className="z-50 bg-white">
      <span>No filters currently added.</span>
      <div>
        <input
          type="text"
          className="border border-slate-400 px-2 py-1"
          placeholder="Search"
        />
      </div>
      <span>Showing {subFilters.length} result</span>
      <ul className="h-[200px] overflow-y-scroll border-b mx-0">
        {subFilters.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
      <div className="flex justify-end gap-2 mt-2 font-bold">
        <button className="px-2 py-1 border rounded-md  text-blue-800 cursor-pointer" onClick={onClose}>Close</button>
        <button  className="px-2 py-1 border rounded-md text-white bg-blue-800 cursor-pointer"> Apply</button>
      </div>
    </div>
  );
};

export default FilterSelection;
