import React from "react";
import AccountList from "./AccountList";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const accounts = [
  { id: 1, value: "Savings Account" },
  { id: 2, value: "Current Account" },
  { id: 3, value: "Business Account" },
  { id: 4, value: "Joint Account" },
  { id: 5, value: "Salary Account" },
  { id: 6, value: "Fixed Deposit Account" },
  { id: 7, value: "Recurring Deposit Account" },
  { id: 8, value: "NRI Account" },
  { id: 9, value: "Corporate Account" },
  { id: 10, value: "Student Account" },
  { id: 11, value: "Premium Account" },
  { id: 12, value: "Basic Account" },
  { id: 13, value: "Trust Account" },
  { id: 14, value: "Minor Account" },
  { id: 15, value: "Investment Account" },
  { id: 16, value: "Loan Account" },
  { id: 17, value: "Overdraft Account" },
  { id: 18, value: "Escrow Account" },
  { id: 19, value: "Merchant Account" },
  { id: 20, value: "Digital Wallet Account" },
  { id: 21, value: "Retirement Account" },
  { id: 22, value: "Pension Account" },
  { id: 23, value: "Tax Account" },
  { id: 24, value: "Insurance Account" },
  { id: 25, value: "Credit Account" },
  { id: 26, value: "Foreign Currency Account" },
  { id: 27, value: "Payroll Account" },
  { id: 28, value: "Custodial Account" },
  { id: 29, value: "Settlement Account" },
  { id: 30, value: "Virtual Account" },
];
const AssignAccount = ({selectedUser}) => {
  return (
    <>
      <div className="my-4">Manage Account Ids for {selectedUser?.firstName}</div>
      <div className="w-[80%] flex justify-center mx-auto gap-8">
        <AccountList type={"assigned"} accounts={accounts} />
        <div className="flex items-center flex-col my-auto gap-6">
          <ArrowBackIcon className="bg-sky-500 rounded-xl hover:text-white hover:bg-sky-900" />
          <ArrowForwardIcon className="bg-sky-500 rounded-xl hover:text-white hover:bg-sky-900" />
        </div>
        <AccountList type={"unassigned"} accounts={accounts} />
      </div>
    </>
  );
};

export default AssignAccount;
