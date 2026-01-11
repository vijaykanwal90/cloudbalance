import React, { useState, useEffect } from "react";
import { validateEmail } from "../../utils/formValidation";
import {
  getUserByIdApi,
  createUserApi,
  updateUserApi,
} from "../../APIs/user.api";
import { roles } from "../../constants/roles";
import AssignAccount from "../account-components/AssignAccount";

const UserForm = ({ id, isEditMode, onSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);

  useEffect(() => {
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
            password: "",
          });

          setSelectedUser(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetchingUser(false);
      }
    };
    if (isEditMode && id) {
      fetchUser();
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.firstName.trim()) return false;
    if (!form.lastName.trim()) return false;
    if (!form.email.trim()) return false;
    if (!validateEmail(form.email)) return false;
    if (!form.role) return false;
    if (!isEditMode && !form.password.trim()) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      let payload;

      if (isEditMode) {
        const { password, ...rest } = form;
        payload = { ...rest };
      } else {
        payload = { ...form };
      }

     
      if (payload.role === "customer" && selectedAccountIds?.length > 0) {
        payload.accountIds = selectedAccountIds;
      }
      if (isEditMode) {
        

        await updateUserApi(id, payload);
      } else {
        const res = await createUserApi(payload);
        setSelectedUser(res?.data || null);
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
      <div className="w-full flex justify-center py-8">
        <div className="w-[95%] bg-white p-8 rounded-md shadow-sm flex items-center justify-center min-h-[600px]">
          <p className="text-gray-500">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-[95%] flex gap-6">
        <div className="w-1/2 bg-white rounded-md shadow-sm">
          <div className="p-8 h-full flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              {isEditMode ? "Edit User" : "Add New User"}
            </h2>

            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  disabled={loading}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  disabled={loading}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              {!isEditMode && (
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={loading}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6 pt-6 ">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-gray-400 transition shadow-sm font-medium"
              >
                {loading
                  ? "Processing..."
                  : isEditMode
                  ? "Update User"
                  : "Add User"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 relative">
          <div
            className={`
              absolute inset-0 bg-white rounded-md shadow-sm
              transition-all duration-300 ease-out
              ${
                form.role === "customer"
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }
            `}
          >
            <div className=" px-2 py-2 h-full">
              <AssignAccount
                selectedUser={isEditMode ? selectedUser : null}
                setSelectedAccountIds={setSelectedAccountIds}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
