import React, { useState, useEffect } from "react";
import { validateEmail } from "../../utils/formValidation";
import {
  getUserByIdApi,
  createUserApi,
  updateUserApi,
} from "../../APIs/user.api";
import { roles } from "../../constants/roles";
import AssignAccount from "../account-components/AssignAccount";
import { toast } from "sonner";

const UserForm = ({ id, isEditMode }) => {
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
  const [error, setError] = useState({});
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
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (
      form.firstName.trim().length < 3 ||
      form.firstName.trim().length > 20
    ) {
      newErrors.firstName = "First name must be between 3 and 20 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.role) {
      newErrors.role = "Role is required";
    }

    if (!isEditMode && !form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("handle submit");
    if (!validateForm()) return;
    console.log("create user clicked");
   
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
        const res =  await updateUserApi(id, payload);
        if(res.status==200){
          console.log("updated")
          toast.success("user updated succesfully")
        }
      } else {
        const res = await createUserApi(payload);
        console.log("created")
        toast.success("User created successfully")
        setSelectedUser(res?.data || null);
      }

      
    } catch (error) {
      console.error(error);
      toast.error(error)
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) {
    return (
      <div className="w-full flex justify-center py-8 ">
        <div className="w-[95%] bg-white p-8 rounded-md shadow-sm flex items-center justify-center min-h-[600px]">
          <p className="text-gray-500">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full    overflow-y-hidden">
      {/* <div className="w-[95%] "> */}
        <div className="w-1/2 p-2 bg-white rounded-md shadow-sm ">
          <div className=" h-full flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 ">
              {isEditMode ? "Edit User" : "Add New User"}
            </h2>

            <div className="grid grid-cols-2 gap-4 flex-1 ">
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
                {error.firstName && (
                  <p className="text-red-500 text-sm">{error.firstName}</p>
                )}
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
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
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
                  {error.password && (
                    <p className="text-red-500 text-sm">{error.password}</p>
                  )}
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
                {error.role && (
                  <p className="text-red-500 text-sm">{error.role}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-2  ">
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

        <div className=" relative ">
          {/* <div
            className={`
              absolute inset-0 bg-white rounded-md shadow-sm
              transition-all duration-300 ease-out
              ${
                form.role === "customer"
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }
            `}
          > */}
          { form.role ==="customer" && 
            <div className=" px-2  h-full transition-all duration-300 ease-in-out
 ">
              <AssignAccount
                selectedUser={isEditMode ? selectedUser : null}
                setSelectedAccountIds={setSelectedAccountIds}
              />
            </div>
}
          {/* </div> */}
        </div>
      </div>
    // </div>
  );
};

export default UserForm;
