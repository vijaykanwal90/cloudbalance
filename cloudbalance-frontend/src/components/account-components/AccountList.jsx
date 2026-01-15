import React, { useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";

const AccountList = ({ title, accounts, selected, setSelected }) => {

  
  const selectedIds = useMemo(
    () => new Set(selected.map((acc) => acc.id)),
    [selected]
  );

  const isAllSelected =
    accounts.length > 0 &&
    accounts.every((acc) => selectedIds.has(acc.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(accounts);
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
    <div className=" w-full h-75 shadow  bg-white border-gray-200 ">
      {/* HEADER */}
      <div className="h-12  flex items-center px-2  justify-between border-b text-white bg-sky-600 ">
        <span className="text-sm font-semibold ">{title}</span>
        <span className="text-xs ">
          {accounts.length} {accounts.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="  flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b   text-sm text-gray-700">
          <Checkbox
            size="small"
            checked={isAllSelected}
            indeterminate={selected.length > 0 && !isAllSelected}
            onChange={toggleSelectAll}
            className="p-0"
          />
          <span className="font-medium">
            {isAllSelected ? "Unselect all" : "Select all"}
          </span>
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto pr-1">
          <ul className="space-y-1">
            {accounts.map((account) => {
              const isSelected = selectedIds.has(account.id);

              return (
                <li
                  key={account.id}
                  onClick={() => toggleSelectOne(account)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm transition
                    ${
                      isSelected
                        ? "bg-sky-100 text-sky-700"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <Checkbox
                    size="small"
                    checked={isSelected}
                    className="p-0"
                  />
                  <span className="truncate">{account.accountName}</span>
                </li>
              );
            })}

            {accounts.length === 0 && (
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
