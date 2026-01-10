import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getAllAccountsApi } from "../../APIs/account.api";
// const accounts = [
//   { accountId: "1001", accountName: "Finance Core", accountArn: "arn:aws:iam::1001:root" },
//   { accountId: "1002", accountName: "Billing Services", accountArn: "arn:aws:iam::1002:root" },
//   { accountId: "1003", accountName: "Customer Analytics", accountArn: "arn:aws:iam::1003:root" },
//   { accountId: "1004", accountName: "Dev Sandbox", accountArn: "arn:aws:iam::1004:root" },
//   { accountId: "1005", accountName: "QA Environment", accountArn: "arn:aws:iam::1005:root" },
//   { accountId: "1006", accountName: "Production Core", accountArn: "arn:aws:iam::1006:root" },
//   { accountId: "1007", accountName: "Logging & Monitoring", accountArn: "arn:aws:iam::1007:root" },
//   { accountId: "1008", accountName: "Security Services", accountArn: "arn:aws:iam::1008:root" },
//   { accountId: "1009", accountName: "Data Warehouse", accountArn: "arn:aws:iam::1009:root" },
//   { accountId: "1010", accountName: "AI & ML Platform", accountArn: "arn:aws:iam::1010:root" },
//   { accountId: "1011", accountName: "Internal Tools", accountArn: "arn:aws:iam::1011:root" },
//   { accountId: "1012", accountName: "Marketing Apps", accountArn: "arn:aws:iam::1012:root" },
//   { accountId: "1013", accountName: "Partner Integrations", accountArn: "arn:aws:iam::1013:root" },
//   { accountId: "1014", accountName: "Disaster Recovery", accountArn: "arn:aws:iam::1014:root" },
//   { accountId: "1015", accountName: "Experimental Labs", accountArn: "arn:aws:iam::1015:root" },
// ];

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
  console.log(accounts)
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
