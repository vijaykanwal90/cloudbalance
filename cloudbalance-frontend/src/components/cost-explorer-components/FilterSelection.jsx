import React, { useEffect, useState } from "react";
import { getKeysOfGroupApi } from "../../APIs/cost.api";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const FilterSelection = ({
  filter,
  filterSelectionBox,
  setFilterSectionBox,
  openedFilter,
  setOpenedFilter,
  query,
  setQuery,
}) => {
  const [subFilters, setSubFilters] = useState([]);
  const [selectedSubFilters, setSelectedSubFilters] = useState([]);
  const onClose = () => {
    setOpenedFilter(null);
    setFilterSectionBox(false);
  };

  const handleApply = () => {
    setQuery((prev) => ({
      ...prev,
      [filter.key]: selectedSubFilters,
    }));

    setOpenedFilter(null);
    setFilterSectionBox(false);
  };
  useEffect(() => {
    if (!filter?.key) return;

    const fetchSubFilters = async () => {
      try {
        const res = await getKeysOfGroupApi(filter.key);

        if (res.status === 200) {
          setSubFilters(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch sub filters", error);
        setSubFilters([]);
      }
    };

    fetchSubFilters();
  }, [filter]);
  const selectSubFilters = (item) => {
    setSelectedSubFilters((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };
  useEffect(() => {
    if (!filter?.key) return;

    const valuesFromQuery = query?.[filter.key];
    if (Array.isArray(valuesFromQuery)) {
      setSelectedSubFilters(valuesFromQuery);
    } else {
      setSelectedSubFilters([]);
    }
  }, [filter, query]);

  return (
    <div className="z-50 bg-white min-h-0">
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
        {subFilters.map((item) => (
          <li
            key={item}
            onClick={() => {
              selectSubFilters(item);
            }}
            className="cursor-pointer"
          >
            <span>
              {selectedSubFilters.includes(item) ? (
                <CheckBoxIcon className="text-blue-600" fontSize="small" />
              ) : (
                <CheckBoxOutlineBlankIcon fontSize="small" />
              )}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex justify-end gap-2 mt-2 font-bold">
        <button
          className="px-2 py-1 border rounded-md text-blue-800 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>

        <button
          className="px-2 py-1 border rounded-md text-white bg-blue-800 cursor-pointer"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSelection;
