import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneIcon from "@mui/icons-material/Tune";

const CostGroupBy = ({
  query,
  setQuery,
  sideFilterOpen,
  setSideFilterOpen,
  filterList,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const groupBy =
    filterList.find((f) => f.key === query.group) || filterList[0];

  const mainList = filterList.slice(0, 5);
  const moreList = filterList.slice(5);
  const open = Boolean(anchorEl);

  const openDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const formatKeyToLabel = (key) => {
    if (!key) return "";

    const withSpaces = key.replace(/_/g, " ");

    const label = withSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return label;
  };
  const selectGroupBy = (option) => {
    setQuery((prev) => ({
      ...prev,
      group: option.key,
    }));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSideFilter = () => {
    setSideFilterOpen(!sideFilterOpen);
  };
  const handleChange = () => {
    const startDateInput = document.querySelector("#start-date");
    const endDateInput = document.querySelector("#end-date");

    if (!startDateInput.value) {
      endDateInput.disabled = true;
    } else {
      endDateInput.disabled = false;
    }
    if (startDateInput.value && endDateInput.value) {
      setQuery((prev) => ({
        ...prev,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
      }));
    }
  };

  console.log("rendered ...");
  return (
    <div className="border-b bg-white px-4 py-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-1 min-w-0 ">
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-gray-700 font-medium whitespace-nowrap">
              Group By:
            </span>
            <span className="rounded-md font-semibold text-sm bg-blue-800 text-white px-3 py-1.5 shadow-sm whitespace-nowrap">
              {formatKeyToLabel(groupBy?.key)}
            </span>
            <span className="h-6 border-r border-gray-300"></span>
          </div>

          <div className="flex items-center gap-2 flex-wrap overflow-x-auto max-w-full">
            {mainList
              .filter((option) => option.key !== groupBy.key) // exclude selected
              .map((option) => (
                <span
                  key={option.key}
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
                    whitespace-nowrap
                  "
                  onClick={() => selectGroupBy(option)}
                >
                  {formatKeyToLabel(option.key)}
                </span>
              ))}
          </div>

          <div>
            <button
              className="
              text-blue-700 font-semibold text-sm flex items-center gap-1 
              px-3 py-1.5 transition-all cursor-pointer shrink-0
            "
              onClick={openDropDown}
            >
              More
              <KeyboardArrowDownIcon fontSize="small" />
            </button>

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
              {moreList
                .filter((option) => option.key !== groupBy.key)
                .map((option) => (
                  <MenuItem
                    key={option.key}
                    onClick={() => selectGroupBy(option)}
                    sx={{
                      paddingY: 1.2,
                      "&:hover": { backgroundColor: "#e8f1ff" },
                    }}
                  >
                    {formatKeyToLabel(option.key)}
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </div>

        <div className="flex">
          <div className="border px-2 flex gap-2 text-blue-900 font-bold bg-white ">
            <input type="date" id="start-date" onChange={handleChange} />
            <span className="border"></span>

            <input type="date" id="end-date" onChange={handleChange} disabled />
          </div>

          <div
            className={`cursor-pointer border-2 rounded-md px-1 py-1 shrink-0 ${
              sideFilterOpen
                ? "bg-blue-800 text-white border-blue-800"
                : "bg-white text-blue-800 border-blue-800"
            }`}
            onClick={toggleSideFilter}
          >
            <TuneIcon sx={{ width: 30, height: 20 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostGroupBy;
