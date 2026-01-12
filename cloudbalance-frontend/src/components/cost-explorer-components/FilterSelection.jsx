import React, { useEffect, useState } from "react";
import { getKeysOfGroupApi } from "../../APIs/cost.api";

const FilterSelection = ({
  filter,
  filterSelectionBox,
  setFilterSectionBox,
  openedFilter,
  setOpenedFilter,
}) => {

  const [subFilters, setSubFilters] = useState([]);

  const onClose = () => {
    setOpenedFilter(null);
    setFilterSectionBox(!filterSelectionBox);
  };

  useEffect(() => {
    if (!filter?.key) return;

    const fetchSubFilters = async () => {
      try {
        const res = await getKeysOfGroupApi(filter.key);
        console.log(res)
        if (res.status === 200) {
          setSubFilters(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch sub filters", error);
        setSubFilters([]);
      }
    };

    fetchSubFilters();

  }, [filter]); // ✅ dependency added

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
          <li key={item}>{item}</li> // ✅ better key
        ))}
      </ul>

      <div className="flex justify-end gap-2 mt-2 font-bold">
        <button
          className="px-2 py-1 border rounded-md text-blue-800 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>

        <button className="px-2 py-1 border rounded-md text-white bg-blue-800 cursor-pointer">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSelection;
