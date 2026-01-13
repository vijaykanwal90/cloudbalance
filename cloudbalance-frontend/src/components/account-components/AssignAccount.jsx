import React, { useState, useEffect, useMemo } from "react";
import { getAllAccountsApi, userAccountsApi } from "../../APIs/account.api";
import AccountList from "../account-components/AccountList";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AssignAccount = ({
  selectedUser,
  setSelectedAccountIds,
}) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [assignedAccounts, setAssignedAccounts] = useState([]);

  const [selectedUnassigned, setSelectedUnassigned] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState([]);
  useEffect(() => {
    const fetchAllAccounts = async () => {
      const res = await getAllAccountsApi();
      if (res?.status === 200) {
        setAllAccounts(res.data);
      }
    };
    fetchAllAccounts();
  }, []);

  useEffect(() => {

    const fetchUserAccounts = async () => {
      const res = await userAccountsApi(selectedUser.id);
      if (res?.status === 200) {
        setAssignedAccounts(res.data);
      }
    };
    if (selectedUser?.id) {
      fetchUserAccounts();
    }

  }, [selectedUser]);

  const assignedAccountIds = useMemo(
    () => new Set(assignedAccounts.map((acc) => acc.id)),
    [assignedAccounts]
  );

  const unassignedAccounts = useMemo(
    () => allAccounts.filter((acc) => !assignedAccountIds.has(acc.id)),
    [allAccounts, assignedAccountIds]
  );
  useEffect(() => {
  const ids = assignedAccounts.map((acc) => acc.id);
  setSelectedAccountIds(ids);
}, [assignedAccounts, setSelectedAccountIds]);

  const moveAccountsRight = () => {
    if (selectedUnassigned.length === 0) return;

    setAssignedAccounts((prev) => [...prev, ...selectedUnassigned]);

    setSelectedUnassigned([]); // clear selection
  };
  const moveAccountsLeft = () => {
    if (selectedAssigned.length === 0) return;

    const selectedIds = new Set(selectedAssigned.map((acc) => acc.id));

    setAssignedAccounts((prev) =>
      prev.filter((acc) => !selectedIds.has(acc.id))
    );

    setSelectedAssigned([]); // clear selection
  };

  return (
    <div className="w-[80%] mt-4 flex flex-col">
      {/* <h3 className="text-sm font-semibold  text-gray-700">
        Account Assignment
      </h3> */}

      <div className="flex gap-6 items-stretch flex-1">
        <div className="w-1/2 bg-gray-50   border">
          <AccountList
            title="Available Accounts"
            accounts={unassignedAccounts}
            selected={selectedUnassigned}
            setSelected={setSelectedUnassigned}
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <button
            onClick={moveAccountsRight}
            disabled={selectedUnassigned.length === 0}
            className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-700 disabled:opacity-40"
          >
            <ArrowForwardIcon fontSize="small" />
          </button>

          <button
            onClick={moveAccountsLeft}
            disabled={selectedAssigned.length === 0}
            className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-700 disabled:opacity-40"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 bg-gray-50   border flex flex-col">
          <AccountList
            title="Assigned Accounts"
            accounts={assignedAccounts}
            selected={selectedAssigned}
            setSelected={setSelectedAssigned}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignAccount;
