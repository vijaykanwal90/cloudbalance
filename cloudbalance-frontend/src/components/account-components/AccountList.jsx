import React, { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";

const AccountList = ({ title, accounts, selected, setSelected }) => {
  const [search, setSearch] = useState("");

  const filteredAccounts = useMemo(() => {
    return accounts.filter(acc =>
      acc.accountName.toLowerCase().includes(search.toLowerCase())
    );
  }, [accounts, search]);

  const selectedIds = useMemo(
    () => new Set(selected.map(acc => acc.id)),
    [selected]
  );

  const isAllSelected =
    filteredAccounts.length > 0 &&
    filteredAccounts.every(acc => selectedIds.has(acc.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(filteredAccounts);
    }
  };

  const toggleSelectOne = (account) => {
    if (selectedIds.has(account.id)) {
      setSelected(prev =>
        prev.filter(acc => acc.id !== account.id)
      );
    } else {
      setSelected(prev => [...prev, account]);
    }
  };

  return (
    <div className="bg-white w-full h-[450px] border rounded-md shadow-sm">
      <div className="bg-blue-300 h-12 flex items-center justify-between px-4 text-sm font-medium">
        <span>{title}</span>
        <span className="text-xs opacity-80">
          {accounts.length} items
        </span>
      </div>

      <div className="px-3 py-2 h-[calc(450px-48px)] flex flex-col">
        <div className="flex items-center gap-2 border-b pb-2 mb-2">
          <SearchIcon fontSize="small" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full border-none outline-none focus:outline-none focus:ring-0 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 border-b pb-2 mb-2 text-sm">
          <Checkbox
            size="small"
            checked={isAllSelected}
            indeterminate={
              selected.length > 0 && !isAllSelected
            }
            onChange={toggleSelectAll}
          />
          <span>Select All</span>
        </div>

        <ul className="flex-1 overflow-y-auto space-y-1 pr-1">
          {filteredAccounts.map(account => (
            <li
              key={account.id}
              className="flex items-center gap-2 px-1 hover:bg-slate-100 rounded text-sm border-b cursor-pointer"
              onClick={() => toggleSelectOne(account)}
            >
              <Checkbox
                size="small"
                checked={selectedIds.has(account.id)}
              />
              <span>{account.accountName}</span>
            </li>
          ))}

          {filteredAccounts.length === 0 && (
            <li className="text-sm text-gray-400 text-center py-4">
              No accounts found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AccountList;
