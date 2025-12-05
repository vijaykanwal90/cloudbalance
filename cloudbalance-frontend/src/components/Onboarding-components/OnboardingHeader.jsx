import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
const stepMapping = {
  zero: "Create IAM Role",
  one: "Customer Managed Policy",
  two: "Cost Usage and Report",
};

const OnboardingHeader = ({ step }) => {
  return (
    <div className="flex  bg-white pt-4 gap-6 px-24">
      <div
       className={`${
          step == 1 ? "border-b-4 border-green-600 font-bold" : "text-gray-400"
        } relative h-12  my-0  flex  gap-2`}
      >
        <span>
          {step == 1 ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CircleOutlinedIcon />
          )}
        </span>
        <p>A. Create an IAM Role &gt;</p>
      </div>
      <div
        className={`${
          step == 2 ? "border-b-4 border-green-600 font-bold" : "text-gray-400"
        } relative h-12  my-0  flex  gap-2`}
      >
        <span>
          {step == 2 ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CircleOutlinedIcon />
          )}
        </span>
        <p>B. Add Customer Managed Policies &gt; </p>
      </div>
      <div
        className={`${
          step == 3 ? "border-b-4 border-green-600 font-bold" : "text-gray-400"
        } relative h-12  my-0  flex  gap-2`}
      >
        <span>
          {step == 3 ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CircleOutlinedIcon />
          )}
        </span>
        <p>C. Create CUR </p>
      </div>
    </div>
  );
};

export default OnboardingHeader;
