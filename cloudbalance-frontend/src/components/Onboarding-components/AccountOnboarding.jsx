import React, { useState } from "react";
import OnboardingHeader from "./OnboardingHeader";
import CreateIamRole from "./CreateIamRole";
import CustomManagedPolicies from "./CustomManagedPolicies";
import CostAndUsageReport from "./CostAndUsageReport";
import { useNavigate } from "react-router-dom";
import { onboardAccountApi } from "../../APIs/account.api";
export const StepCounter = ({ number }) => {
  return (
    <span className="text-white bg-slate-500 h-5 w-5 rounded-full px-2 py-1">
      {number}
    </span>
  );
};
const AccountOnboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [errors,setErrors] = useState({})
  const [formData, setFormData] = useState({
    accountId: "",
    accountName: "",
    accountARN: "",
  });
  const validateForm = () => {
       const newErrors ={};
    if(step==1){
       if(!formData.accountId){
          newErrors.accountId = "Account ID is required"
       }
       else if(formData.accountId.trim().length ===0 || formData.length <12){
            newErrors.accountId = "Account ID must be 12 digits";
       }
       if (!formData.accountName) {
        newErrors.accountName = "Account Name is required";
      }
      if (!formData.accountARN) {
        newErrors.accountARN= "Account ARN is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };
  const handleNext = () => {
    if (validateForm()) {
      setStep((prev) => prev + 1);
    }
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      const res = await onboardAccountApi(formData);
      if (res.status === 201) {
        navigate('/dashboard/onboarding')
        console.log("successfully added account");
      }
    }
  };
  return (
    <div className="w-full pb-12">
      <OnboardingHeader step={step} />
      <div className="w-[90%] mx-12">
        {step == 1 && (
          <CreateIamRole formData={formData} setFormData={setFormData} errors={errors} />
        )}
        {step == 2 && <CustomManagedPolicies />}
        {step == 3 && <CostAndUsageReport />}
      </div>
      <div className="mx-12 flex justify-between">
        <button
          className="border border-blue-900 rounded-md px-6 font-bold py-2 bg-white text-blue-900 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <div className="mr-8 flex gap-2">
          {step > 1 && (
            <button
              className="border border-blue-900 rounded-md px-6 font-bold py-2 bg-white text-blue-900"
              onClick={() => {
                setStep((prev) => prev - 1);
              }}
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              className="border border-blue-900 rounded-md px-6 font-bold py-2 bg-white text-blue-900"
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>
          ) : (
            <button
              className="border border-blue-900 rounded-md px-6 font-bold py-2 cursor-pointer bg-white text-blue-900"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountOnboarding;
