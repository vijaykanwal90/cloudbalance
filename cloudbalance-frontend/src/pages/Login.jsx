import React, { useEffect, useState } from "react";
import LoginFooter from "../components/footers/LoginFooter";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { loginApi } from "../APIs/auth.api";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/formValidation";
import {  useSelector } from "react-redux";

const Login = () => {
  const [form, setForm] = useState({
    email: "admin@gmail.com",
    password: "admin123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const validateForm = ({ email, password }) => {
    if (!validateEmail(email.trim())) {
      toast.error("Email is not valid");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password can't be empty");
      return false;
    }
    if (password.trim().length < 6) {
      toast.error("Password should be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    try {
      const res = await loginApi(form);
      if (res.status === 200) {
        console.log(res)
        toast.success("Login successful!");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.errors || "Login failed");
    }
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <form className="w-80 mt-48 mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 items-center w-full">
          <img
            src="./cloudkeeper_logo.svg"
            alt="Cloudkeeper"
            className="mx-auto"
          />

          <div className="w-full">
            <label>Email</label>
            <input
              className="w-full py-1 px-2 border-2 border-gray-300"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="w-full relative">
            <label>Password</label>
            <input
              className="w-full py-1 px-2 border-2 border-gray-300"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute top-8 right-4"
              onClick={handleShowPassword}
            >
              {showPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <button
            className="w-full py-2 mt-2 bg-sky-600 text-white cursor-pointer"
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
