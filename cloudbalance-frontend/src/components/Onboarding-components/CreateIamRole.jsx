import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IamRoleImage from "../../assets/Iam-role-guide-image.png";
import { StepCounter } from "./AccountOnboarding";
const jsonData = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        AWS: "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role",
      },
      Action: "sts:AssumeRole",
      Condition: {
        StringEquals: {
          "sts:ExternalId":
            "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk=",
        },
      },
    },
    {
      Effect: "Allow",
      Principal: {
        Service: "s3.amazonaws.com",
      },
      Action: "sts:AssumeRole",
    },
  ],
};

const CreateIamRole = () => {
  const awsLink =
    "https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fiamv2%2Fhome%3Fregion%3Dus-east-1%26state%3DhashArgs%2523%252Froles%252Fcreate%253Fstep%253DselectEntities%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fiamv2&forceMobileApp=0&code_challenge=myxXjgemIjRXzXBMbstyWH9ZOpslWbJcN0xBiLWg6ng&code_challenge_method=SHA-256";
  return (
    <div className=" my-8 ">
      <h1 className="text-xl font-bold">Create an IAM Role</h1>
      <h4 className="text-gray-500 font-semibold">
        Create an IAM Role by following these steps
      </h4>

      <section className="bg-white px-8 my-8  py-4 flex flex-col gap-6 border-2 border-gray-300 rounded-lg ">
        <div>
          <span className="stepCounter">1</span>
          <span>
            Log into AWS account &
            <span className="text-blue-800 underline font-bold">
              <Link to={awsLink} target="_blank">
                Create an IAM Role.
              </Link>
            </span>
          </span>
        </div>
        <div className="group relative">
          <span className="stepCounter">2</span>In the Trusted entity type
          section, select Custom trust policy. Replace the prefilled policy with
          the policy provided below -<span></span>
          <button className="absolute right-6 my-2 text-blue-800 bg-white border border-blue-800 hover:text-white hover:bg-blue-800">
            <ContentCopyIcon sx={{ width: 20, height: 15 }} />
          </button>
          <textarea
            value={JSON.stringify(jsonData, null, 2)}
            name="custom-trust-policy"
            id="custom-trust-policy"
            readonly
            className="w-full h-64 border rounded-md border-gray-200 bg-slate-100 text-blue-800 font-semibold text-sm "
          ></textarea>
          <p className="opacity-0 group-hover:opacity-100 transition text-xs text-blue-800">
            Click anywhere in box to copy the content inside
          </p>
        </div>
        <div>
          <span className="stepCounter">3</span>
          <span>
            Click on Next to go to the Add permissions page. We would not be
            adding any permissions for now because the permission policy content
            will be dependent on the AWS Account ID retrieved from the IAM Role.
            Click on Next
          </span>
        </div>
        <div className="flex flex-col group">
          <p>
            <span className="stepCounter">4</span>
            In the Role name field, enter the below-mentioned role name, and
            click on Create Role -
          </p>
          <button className="inline-flex border py-2 px-4 gap-4 items-center ">
            <span>
              <ContentCopyIcon />
            </span>
            <pre>CK-Tuner-Role-dev2</pre>
          </button>
          <p className="opacity-0 group-hover:opacity-100 transition text-xs text-blue-800">
            Click anywhere in box to copy the content inside
          </p>
        </div>
        <div>
          <p>
            <span className="stepCounter">5</span>
            Go to the newly create IAM Role and copy the Role ARN -
          </p>
          <img src={IamRoleImage} alt="Iam Role" />
        </div>
        <div className="w-full flex flex-col gap-4">
          <p>
            <span className="stepCounter">6</span>
            Fill out the details below-
          </p>
          <div className="flex items-center justify-between  px-4 py-4">
            <div className="flex flex-col">
              <label htmlFor="">Enter the IAM Role ARN</label>
              <input
                type="text"
                placeholder="Enter the IAM Role ARN "
                className="input-boxes"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Enter the account Id</label>
              <input
                type="text"
                placeholder="Enter the Account Id"
                className="input-boxes"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Enter the Account Name</label>
              <input
                type="text"
                placeholder="Enter the Account Name "
                className="input-boxes"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CreateIamRole;
