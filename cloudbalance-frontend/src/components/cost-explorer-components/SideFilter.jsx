import React, { useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FilterSelection from "./FilterSelection";
import {  useSelector } from "react-redux";
const SideFilter = ({ filterList }) => {
  const [openedFilter, setOpenedFilter] = useState(null);
  const [filterSelectionBox, setFilterSectionBox] = useState(false);
  // const dispatch = useDispatch();
  const query = useSelector((state)=> state.query)
  const openFilterSelection = (filter) => {
    if (filter === openedFilter) {
      setOpenedFilter(null);
      return;
    }
    setOpenedFilter(filter);
    setFilterSectionBox(true);
  };
  const formatKeyToLabel = (key) => {
    if (!key) return "";

    // 1. Convert underscores to spaces
    const withSpaces = key.replace(/_/g, " ");

    // 2. Capitalize first letter of each word, lowercase the rest
    const label = withSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return label;
  };
  const isFilterSelected = (key) => {
  const value = query?.[key];
  return Array.isArray(value) ? value.length > 0 : !!value;
};

  return (
    <div className="min-h-0">
      <div className={`flex justify-between font-bold items-center pt-2 `}>
        <span> Filters</span>
        <button className="text-blue-800 cursor-pointer">
          Reset All
          <span>
            <RestartAltIcon />
          </span>
        </button>
      </div>
      <div>
        <ul>
          {filterList.map((filter, index) => {
            return (
              <li
                key={index}
                className={`py-2  ${
                  filterSelectionBox && filter === openedFilter
                    ? "  border rounded-sm shadow-lg shadow-gray-300 px-2 m"
                    : "px-2"
                }`}
              >
                <span
                  className="flex gap-4 justify-between my-2  cursor-pointer "
                  onClick={() => openFilterSelection(filter)}
                >
                  <span className="flex justify-center gap-2">
                   
                    <span>
                      {isFilterSelected(filter.key) ? (
                        <CheckBoxIcon
                          className="text-blue-600"
                          fontSize="small"
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon fontSize="small" />
                      )}
                    </span>
                    <span className="cursor-pointer font-bold">
                      {/* {filter.label} */}
                      {formatKeyToLabel(filter.key)}
                    </span>
                  </span>
                </span>

                {filterSelectionBox && filter === openedFilter && (
                  <FilterSelection
                    filter={filter}
                    filterSelectionBox={filterSelectionBox}
                    setFilterSectionBox={setFilterSectionBox}
                    openedFilter={openedFilter}
                    setOpenedFilter={setOpenedFilter}
                   
                    
                  />
                )}
                {filter != openedFilter && (
                  <span className="">
                    {index != filterList.length && <hr />}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideFilter;
