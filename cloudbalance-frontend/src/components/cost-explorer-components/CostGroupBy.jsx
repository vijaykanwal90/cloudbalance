import React, { useState } from "react";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from '@mui/icons-material/Tune';
const groupByLabels = [
  "service",
  "instantType",
  "accountId",
  "usageType",
  "platform",
  "region",
];



const CostGroupBy = ({sideFilterOpen, setSideFilterOpen, filterList}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [groupBy, setGroupBy] = useState("service");

  const open = Boolean(anchorEl);

  const openDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const selectGroupBy = (group) => {
    setGroupBy(group);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleSideFilter = ()=>{
    setSideFilterOpen(!sideFilterOpen)
  }
  return (
    <div className="border-b bg-white px-4 py-3">
      <div className="flex justify-between">
      <div className="flex items-center gap-2">
        {/* Group By Selected Badge */}
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">Group By:</span>
          <span className="rounded-md font-semibold text-sm bg-blue-800 text-white px-3 py-1.5 shadow-sm">
            {groupBy}
          </span>
          <span className="h-6 border-r border-gray-300"></span>
        </div>

        {/* Group Options */}
        <div className="flex items-center gap-2 flex-wrap">
          {groupByLabels
            .filter((group) => group !== groupBy)
            .map((group) => (
              <span
                key={group}
                className="
                rounded-md 
                text-blue-800 
                font-semibold 
                border border-gray-300 
                text-sm px-3 py-1.5 
                bg-gray-50
                hover:bg-blue-50
                cursor-pointer 
                transition-all
              "
                onClick={() => selectGroupBy(group)}
              >
                {group}
              </span>
            ))}
        </div>

        {/* More Button */}
        <button
          className="
            text-blue-700 font-semibold text-sm flex items-center gap-1 
            px-3 py-1.5 transition-all cursor-pointer
          "
          onClick={openDropDown}
        >
          More
          <KeyboardArrowDownIcon fontSize="small" />
        </button>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 4,
            style: {
              minWidth: 200,
              padding: "4px 0",
              borderRadius: "10px",
            },
          }}
        >
          {filterList.map((option) => (
            <MenuItem
              key={option}
              onClick={() => selectGroupBy(option)}
              sx={{
                paddingY: 1.2,
                "&:hover": {
                  backgroundColor: "#e8f1ff",
                },
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className={`cursor-pointer text-blue-800 border-blue-800 px-1 py-1  border-2 rounded-md ${sideFilterOpen ? "text-white bg-blue-800":" text-blue-800 bg-white"}`}>
          <TuneIcon onClick={toggleSideFilter} sx={{width:30 , height:20}}/>
      </div>
      </div>
    </div>
  );
};

export default CostGroupBy;
