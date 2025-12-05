import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import reportDetails from "../../assets/report-details.png";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CongfigureS3Bucket from "../../assets/configure-s3bucket.png";
import ReportDeliveryOption from "../../assets/report-delivery-option.png";

import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import { Link } from "react-router-dom";
const CostAndUsageReport = () => {
  const awsLink =
    "https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fiamv2%2Fhome%3Fregion%3Dus-east-1%26state%3DhashArgs%2523%252Froles%252Fcreate%253Fstep%253DselectEntities%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fiamv2&forceMobileApp=0&code_challenge=myxXjgemIjRXzXBMbstyWH9ZOpslWbJcN0xBiLWg6ng&code_challenge_method=SHA-256";
  return (
    <div className=" my-8 ">
      <h1 className="text-xl font-bold">Create Cost & Usage Report</h1>
      <h4 className="text-gray-500 font-semibold">
        Create a Cost & Usage Report by following these steps
      </h4>

      <section className="bg-white px-6 my-8  py-4 flex flex-col gap-6 border-2 border-gray-300 rounded-md ">
        <div>
          <span className="stepCounter">1</span>
          <span>
            <span className="">
              Go to &nbsp;
              <span className="font-bold underline text-blue-800">
                <Link to={awsLink} target="_blank">
                  Cost and Usage Reports
                </Link>
              </span>
              &nbsp;in the Billing Dashboard and click on{" "}
              <span className="font-bold">Create report.</span>
            </span>
          </span>
        </div>
        <div>
          <p>
            <span className="stepCounter">2</span>
            Name the report as shown below and select the
            <span>Include resource IDs</span>
            checkbox -
          </p>
          <button className="flex py-2 px-4 border bg-gray-100">
            <ContentCopyIcon />
            <pre>ck-tuner-275595855473-hourly-cur</pre>
          </button>
          <p>Ensure that the following configuration is checked</p>
          <p className="py-2">
            <span className="text-white bg-gray-200  m-0">
              <CheckBoxOutlinedIcon />
            </span>
            Include Resource Ids
          </p>

          <p>
            Click on <span className="font-bold">Next</span>
          </p>
          <div className="w-full">
            <img src={reportDetails} alt="Report Details" className="w-full" />
          </div>
        </div>
        <div>
          <p>
            <span className="stepCounter">3</span>
            In Configure S3 Bucket, provide the name of the S3 bucket that was
            created -
          </p>

          <p>Ensure that the following configuration is checked</p>
          <p className="py-2 cursor-pointer">
            <span className="text-white bg-gray-200  m-0">
              <CheckBoxOutlinedIcon />
            </span>
            The following default policy will be applied to your bucket
          </p>

          <p>
            Click on <span className="font-bold">Save</span>
          </p>
          <div className="w-full">
            <img
              src={CongfigureS3Bucket}
              alt="Configure s3 bucket"
              className="w-full"
            />
          </div>
        </div>
        <div>
          <p>
          <span className="stepCounter">4</span>
            In the Delivery options section, enter the below-mentioned Report
            path prefix -
          </p>
          <p>Report path prefix:</p>
          <button className="flex py-2 px-4 border bg-gray-100">
            <ContentCopyIcon />
            <pre>275595855473</pre>
          </button>
          <div>
            <p>Additionally, ensure that the following checks are in place</p>
            <p>Time granularity:</p>
            <span>
              <RadioButtonCheckedOutlinedIcon />
              <span>Hourly</span>
            </span>
          </div>
          <p>
            Please make sure these checks are Enabled in Enable report data
            integration for:
          </p>
          <p className="py-2">
            <span className="text-white bg-gray-200  m-0">
              <CheckBoxOutlinedIcon />
            </span>
            Amazon Athena
          </p>

          <div className="w-full">
            <img
              src={ReportDeliveryOption}
              alt="Report Delivery Option"
              className="w-full"
            />
          </div>
        </div>
        <div>
          <p>
            <span className="stepCounter">5</span>
            Click on <span className="font-bold">Next</span>. Now, review the configuration of the Cost and Usage
            Report. Once satisfied, click on  <span className="font-bold">Create Report</span>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CostAndUsageReport;
