import React, { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";

const AccountList = ({ title, accounts, selected, setSelected }) => {
  const [search, setSearch] = useState("");

  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) =>
      acc.accountName.toLowerCase().includes(search.toLowerCase())
    );
  }, [accounts, search]);

  const selectedIds = useMemo(
    () => new Set(selected.map((acc) => acc.id)),
    [selected]
  );

  const isAllSelected =
    filteredAccounts.length > 0 &&
    filteredAccounts.every((acc) => selectedIds.has(acc.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(filteredAccounts);
    }
  };

  const toggleSelectOne = (account) => {
    if (selectedIds.has(account.id)) {
      setSelected((prev) => prev.filter((acc) => acc.id !== account.id));
    } else {
      setSelected((prev) => [...prev, account]);
    }
  };

  return (
    <div className="bg-white w-full  h-75  shadow-sm flex flex-col">
      {/* HEADER */}
      <div className="h-12 flex items-center justify-between border-b">
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <span className="text-xs text-gray-500">
          {accounts.length} {accounts.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className=" py-4 flex-1 flex flex-col overflow-hidden">
        {/* <div className="flex items-center gap-2 border rounded-md px-3 py-2 mb-3 bg-white">
          <SearchIcon fontSize="small" className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search accounts..."
            className="w-full text-sm border-none outline-none focus:ring-0"
          />
        </div> */}

        {/* SELECT ALL */}
        <div className="flex items-center  border-b pb-2 mb-2 text-sm text-gray-700">
          <Checkbox
            size="small"
            checked={isAllSelected}
            indeterminate={selected.length > 0 && !isAllSelected}
            onChange={toggleSelectAll}
          />
          <span className="font-medium">
            {isAllSelected ? "Unselect all" : "Select all"}
          </span>
        </div>

        {/* LIST */}
        <div className="flex-1  overflow-y-scroll  pr-1">
          <ul className="space-y-1">
            {filteredAccounts.map((account) => {
              const isSelected = selectedIds.has(account.id);

              return (
                <li
                  key={account.id}
                  onClick={() => toggleSelectOne(account)}
                  className={`flex items-center gap-2 px-2 py-2 border-b border-2 rounded-md  cursor-pointer text-sm transition-colors
                    ${
                      isSelected
                        ? "bg-sky-50 text-sky-700 border border-sky-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }
                  `}
                >
                  <Checkbox size="small" checked={isSelected} />
                  <span className="truncate">{account.accountName}</span>
                </li>
              );
            })}

            {filteredAccounts.length === 0 && (
              <li className="text-sm text-gray-400 text-center py-8">
                No accounts found
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
