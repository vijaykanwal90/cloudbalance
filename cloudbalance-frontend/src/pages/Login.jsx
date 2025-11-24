import React from "react";
import LoginFooter from "../components/footers/LoginFooter";

const Login = () => {
  return (
    <>
    <div className="w-80 mt-48 mx-auto ">
      <div className=" w-full flex flex-col gap-6 items-center ">
        <div className="mx-auto relative">
          <img src="./cloudkeeper_logo.svg" alt="Cloudkeeper" />
        </div>

        <div className="w-full">
          <label htmlFor="">Email</label>
          <input
            className=" w-full py-1 border-2 border-gray-300"
            type="email"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            className="w-full py-1 border-2 border-gray-300"
            type="password"
          />
        </div>

        <button className="w-full text-white  bg-sky-600  py-2 mt-2">
          Login
        </button>
      </div>
    </div>
    <LoginFooter/>
    </>
  );
};

export default Login;
