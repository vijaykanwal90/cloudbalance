import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAccountsApi, orphanAccountsApi } from "../../APIs/account.api"; // make sure you have this API

const Onboarding = () => {
  const [accounts, setAccounts] = useState([]);
  const [showOrphan, setShowOrphan] = useState(false); // toggle state
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = showOrphan
        ? await orphanAccountsApi()
        : await getAllAccountsApi();

      if (res.status === 200) {
        setAccounts(res.data);
      }
    } catch (err) {
      console.error(err);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [showOrphan]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowOrphan((prev) => !prev)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm cursor-pointer"
        >
          {showOrphan ? "Show All Accounts" : "Show Orphan Accounts"}
        </button>
        <Link
          to="/dashboard/onboarding/link-account"
          className="bg-blue-900 text-white text-sm px-4 py-2 rounded hover:bg-blue-800"
        >
          Link Accounts
        </Link>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-white rounded shadow mb-4">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-4">No accounts found</div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-blue-900 text-white text-sm">
                <tr>
                  <th className="px-4 py-3 text-left border-b">Account ID</th>
                  <th className="px-4 py-3 text-left border-b">Account Name</th>
                  <th className="px-4 py-3 text-left border-b">Account ARN</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {accounts.map((account, index) => (
                  <tr
                    key={index}
                    className={`transition border-b ${
                      index % 2 === 0 ? "bg-slate-200" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-4 py-3">{account.accountId}</td>
                    <td className="px-4 py-3">{account.accountName}</td>
                    <td className="px-4 py-3 break-all">
                      {account.accountARN}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
