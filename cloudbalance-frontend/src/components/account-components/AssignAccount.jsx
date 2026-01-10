import React, { useEffect, useMemo, useState } from "react";
import AccountList from "./AccountList";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAllAccountsApi, userAccountsApi } from "../../APIs/account.api";

const AssignAccount = ({ selectedUser }) => {
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
    if (!selectedUser?.id) return;

    const fetchUserAccounts = async () => {
      const res = await userAccountsApi(selectedUser.id);
      if (res?.status === 200) {
        setAssignedAccounts(res.data);
      }
    };

    fetchUserAccounts();
  }, [selectedUser?.id]);

  const assignedAccountIds = useMemo(
    () => new Set(assignedAccounts.map((acc) => acc.id)),
    [assignedAccounts]
  );

  const unassignedAccounts = useMemo(
    () => allAccounts.filter((acc) => !assignedAccountIds.has(acc.id)),
    [allAccounts, assignedAccountIds]
  );

  const assignAccounts = () => {
    setAssignedAccounts((prev) => [...prev, ...selectedUnassigned]);
    setSelectedUnassigned([]);
  };

  const unassignAccounts = () => {
    setAssignedAccounts((prev) =>
      prev.filter((acc) => !selectedAssigned.some((a) => a.id === acc.id))
    );
    setSelectedAssigned([]);
  };

  
  return (
  <>
    <h2 className="my-4 text-center text-lg font-semibold">
      Manage Accounts for {selectedUser?.firstName}
    </h2>

    <div className="w-[85%] mx-auto">
      <div className="flex justify-center gap-8">
        {/* LEFT */}
        <div className="w-[380px]">
          <AccountList
            title="Available Accounts"
            accounts={unassignedAccounts}
            selected={selectedUnassigned}
            setSelected={setSelectedUnassigned}
          />
        </div>

        {/* ARROWS */}
        <div className="flex items-center flex-col justify-center gap-6">
          <ArrowForwardIcon
            onClick={assignAccounts}
            className="cursor-pointer bg-sky-500 text-white rounded-xl p-1 hover:bg-sky-700 transition"
          />
          <ArrowBackIcon
            onClick={unassignAccounts}
            className="cursor-pointer bg-sky-500 text-white rounded-xl p-1 hover:bg-sky-700 transition"
          />
        </div>

        {/* RIGHT */}
        <div className="w-[380px] flex flex-col">
          <AccountList
            title="Assigned Accounts"
            accounts={assignedAccounts}
            selected={selectedAssigned}
            setSelected={setSelectedAssigned}
          />

          <div className="flex justify-end mt-4">
            <button
              className="px-6 py-2 bg-sky-600 text-white rounded-md
                         hover:bg-sky-700 transition text-sm font-medium"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);


};

export default AssignAccount;
