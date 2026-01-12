import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getAllAccountsApi } from "../../APIs/account.api";


const Onboarding = () => {
  const [accounts, setAccounts] = useState([])
  useEffect(()=>{
       const fetchAccounts = async()=>{
          const res = await getAllAccountsApi();
          if(res.status===200){
            setAccounts(res.data)
          }
       }
       if(!accounts || accounts.length ==0){
        fetchAccounts()
       }
  },[accounts])
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-end">
        <Link
          to="/dashboard/onboarding/link-account"
          className="bg-blue-900 text-white text-sm px-4 py-2 rounded hover:bg-blue-800"
        >
          Link Accounts
        </Link>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-white rounded shadow mb-4">
        <div className="overflow-x-auto">
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
                  className={`transition border-b ${index%2==0 ? "bg-slate-200":"bg-slate-50"}`}
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
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
