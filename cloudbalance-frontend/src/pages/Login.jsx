import React, { useEffect, useState } from "react";
import LoginFooter from "../components/footers/LoginFooter";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import {loginApi} from '../APIs/auth.api'
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/formValidation";
import { useDispatch } from "react-redux";
import {getCurrentUserApi} from "../APIs/auth.api"
const Login = () => {
  const [form, setForm] = useState({
    email: "admin@gmail.com",
    password: "admin123",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      // setForm({ ...form, email: value });
      setForm((prev) => ({ ...prev, email: value }));
    } else if (name === "password") {
      setForm((prev) => ({ ...prev, password: value }));
    }
  };
  
  function validatePassword(password) {
    password = password.trim();

    if (password.length === 0) {
      toast.error("Password can't be empty");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password should be greater than 8");
      return false;
    }
    return true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(form.email);
    if (!isEmailValid) {
      return;
    }
    const isPasswordValid = validatePassword(form.password);

    if (!isPasswordValid) {
      return;
    }
    try {
       const res = await loginApi(form)
      console.log( " on get/auth/me " , res);
     if(res.status==200){
      console.log("fetching current user")
      dispatch(getCurrentUserApi());
      navigate("/dashboard");
     }
      
      toast.success("email and password are valid");
    } catch (error) {
      toast.error(error.message);
    }
  };
  // useEffect(() => {}, [ navigate]);
  return (
    <>
      <form className="w-80 mt-48 mx-auto " onSubmit={handleSubmit}>
        <div className=" w-full flex flex-col gap-6 items-center ">
          <div className="mx-auto relative">
            <img src="./cloudkeeper_logo.svg" alt="Cloudkeeper" />
          </div>

          <div className="w-full">
            <label htmlFor="">Email</label>
            <input
              className=" w-full py-1 border-2 border-gray-300"
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div className="w-full relative">
            <label htmlFor="password">Password</label>
            <input
              className="w-full py-1 border-2 border-gray-300"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={form.password}
            />
            <button
              className="absolute top-8 right-4"
              onClick={handleShowPassword}
              type="button"
            >
              {showPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <button
            className="w-full text-white  bg-sky-600  py-2 mt-2"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <LoginFooter />
    </>
  );
};

export default Login;
