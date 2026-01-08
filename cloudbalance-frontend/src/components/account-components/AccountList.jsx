import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";

const AccountList = ({ type, accounts }) => {
  return (
    <div className="bg-white w-full h-[450px] border rounded-md shadow-sm">
      <div className="bg-blue-300 h-12 flex items-center justify-between px-4 text-sm font-medium">
        <span>
          {type === "assigned"
            ? "Associated Account Ids"
            : "Available Accounts to Associate"}
        </span>
        <span className="text-xs opacity-80">
          {type === "assigned" ? "added" : "available"}
        </span>
      </div>

      <div className="px-3 py-2 h-[calc(450px-48px)] flex flex-col">
        <div className="flex items-center gap-2 border-b pb-2 mb-2">
          <SearchIcon fontSize="small" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-none outline-none focus:outline-none focus:ring-0 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 border-b pb-2 mb-2 text-sm">
          <Checkbox size="small" />
          <span>Select All</span>
        </div>

        <ul className="flex-1 overflow-y-auto space-y-1 pr-1">
          {accounts.map((account) => (
            <li
              key={account.id}
              className="flex items-center gap-2 px-1  hover:bg-slate-100 rounded text-sm border-b"
            >
              <Checkbox size="small" />
              <span>{account.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountList;
