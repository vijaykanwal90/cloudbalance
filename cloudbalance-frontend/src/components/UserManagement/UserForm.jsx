import React, { useState, useEffect } from "react";
import { validateEmail } from "../../utils/formValidation";
import {
  getUserByIdApi,
  createUserApi,
  updateUserApi,
} from "../../APIs/user.api";
import { roles } from "../../constants/roles";

const UserForm = ({ id, isEditMode, onSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      fetchUser();
    }
  }, [isEditMode, id]);

  const fetchUser = async () => {
    setFetchingUser(true);
    try {
      const res = await getUserByIdApi(id);
      if (res.status === 200) {
        setForm({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          email: res.data.email || "",
          role: res.data.role ? res.data.role.toLowerCase() : "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingUser(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (form.firstName.trim().length === 0) {
      return false;
    }
    if (form.lastName.trim().length === 0) {
      return false;
    }
    if (form.email.trim().length === 0) {
      return false;
    }
    if (!validateEmail(form.email)) {
      return false;
    }
    if (!form.role) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditMode) {
        const { password, ...updatePayload } = form;
        await updateUserApi(id, updatePayload);
      } else {
        await createUserApi(form);
      }

      if (!isEditMode) {
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          password: "",
        });
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) {
    return (
      <div className="w-8/12 h-[35vh] bg-white p-4 rounded-md my-4 flex items-center justify-center">
        <p className="text-gray-500">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 w-8/12 bg-white p-4 rounded-md my-4 py-8 px-8 gap-4">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="mb-1 font-medium">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="border-2 border-gray-300 px-2 rounded-sm py-2 focus:outline-none focus:border-sky-500"
          placeholder="Enter first name"
          onChange={handleChange}
          value={form.firstName}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="lastName" className="mb-1 font-medium">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="border-2 border-gray-300 px-2 rounded-sm py-2 focus:outline-none focus:border-sky-500"
          placeholder="Enter last name"
          onChange={handleChange}
          value={form.lastName}
          disabled={loading}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border-2 border-gray-300 px-2 rounded-sm py-2 focus:outline-none focus:border-sky-500"
          placeholder="Enter email address"
          onChange={handleChange}
          value={form.email}
          disabled={loading}
        />
      </div>

      {!isEditMode && (
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="border-2 border-gray-300 px-2 rounded-sm py-2 focus:outline-none focus:border-sky-500"
            placeholder="Enter email address"
            onChange={handleChange}
            value={form.password}
            disabled={loading}
          />
        </div>
      )}

      <div className="flex flex-col">
        <label htmlFor="role" className="mb-1 font-medium">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border-2 border-gray-300 px-2 rounded-sm py-2 focus:outline-none focus:border-sky-500"
          disabled={loading}
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2 flex gap-4">
        <button
          className="px-6 py-2 bg-sky-600 rounded-md text-white cursor-pointer hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : isEditMode ? "Update User" : "Add User"}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
