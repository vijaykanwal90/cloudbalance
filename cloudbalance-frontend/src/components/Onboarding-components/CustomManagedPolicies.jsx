import React from "react";
import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import PermissionPolicies from "../../assets/permission-policies.png";

import FilterByType from "../../assets/filter-by-type.png"
const CustomManagedPolicies = () => {
  const awsLink =
    "https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fiamv2%2Fhome%3Fregion%3Dus-east-1%26state%3DhashArgs%2523%252Froles%252Fcreate%253Fstep%253DselectEntities%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fiamv2&forceMobileApp=0&code_challenge=myxXjgemIjRXzXBMbstyWH9ZOpslWbJcN0xBiLWg6ng&code_challenge_method=SHA-256";
  return (
    <div className=" my-8 ">
      <h1 className="text-xl font-bold">Add Customer Managed Policies</h1>
      <h4 className="text-gray-500 font-semibold">
        Create an Inline policy for the role by following these steps

      </h4>

      <section className="bg-white px-6 my-8  py-4 flex flex-col gap-6 border-2 border-gray-300 rounded-md ">
        <div>
         <span className="stepCounter">1</span>
          <span>Go to the <span className="text-blue-800 underline font-bold"><Link to={awsLink} target="_blank">CK-Tuner-Role</Link></span></span>
        </div>
        <div>
          <div>
          <span className="stepCounter">2</span>
          <span>In Permission policies, click on  <span className="font-bold">Add permissions  &gt; Attach Policy</span> </span>
          </div>
          <div>
            <img src={PermissionPolicies} alt="PermissionPolicies" />
          </div>
        </div>
        <div>
          <div >
            <span className="stepCounter">3</span><span>Filter by Type &gt; Customer managed then search for <span className="font-bold">cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials </span> and select them.</span>
            </div>
            <div>
                <img src={FilterByType} alt="Filter-By-Type" />
            </div>
        </div>
        <div>
            <span className="stepCounter">4</span>
            <span>Now, click on <span className="font-bold">Add permissions</span></span>
        </div>
      </section>
    </div>
  );
};

export default CustomManagedPolicies;
