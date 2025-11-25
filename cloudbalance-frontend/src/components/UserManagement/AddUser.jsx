import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
const AddUser = () => {
  const roles = ["admin", "read-only", "customer"];
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    roles: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const addRole = (newRole) => {
    setForm((prev) => ({
      ...prev,
      roles: [...prev.roles, newRole],
    }));
  };

  const handleRoleChange = (selectedRole) => {
    if (form.roles.includes(selectedRole)) {
      const updatedRoles = form.roles.filter((role) => role !== selectedRole);
      setForm((prev) => ({
        ...prev,
        roles: updatedRoles,
      }));
    } else {
      addRole(selectedRole);
    }
  };

  console.log(form);
  return (
    <div className="grid grid-cols-2 w-8/12 h-[35vh] bg-white p-4 rounded-md my-4 py-8 px-8 gap-4">
      <div className="flex flex-col">
        <label htmlFor="email">First Name</label>
        <input
          type="text"
          className="border-2 border-gray-300 px-2 rounded-sm"
          placeholder="Enter your first Name"
          required
          name="firstName"
          onChange={handleChange}
          value={form.firstName}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Last Name</label>
        <input
          type="text"
          name="lastName"
          className="border-2 border-gray-300 px-2 rounded-sm"
          placeholder="Enter your first Name"
          required
          onChange={handleChange}
          value={form.lastName}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email"> Email Id</label>
        <input
          type="text"
          className="border-2 border-gray-300 px-2 rounded-sm"
          placeholder="Enter your first Name"
          required
          name="emailId"
          onChange={handleChange}
          value={form.emailId}
        />
      </div>
      <div className="flex flex-col h-[10vh]">
        <label htmlFor="roles">Select Roles</label>

        <button
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className="border-2 border-gray-300 px-2 rounded-sm"
        >
          <span>
            {form.roles.length > 0 ? form.roles.join(", ") : "Select roles"}
          </span>
          <span> {isDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isDropdownOpen && (
          <ul>
            {roles.map((role) => (
              <li
                key={role}
                value={role}
                name={role}
                onClick={() => handleRoleChange(role)}
                className={`flex items-center cursor-pointer my-1 px-3 rounded-md ${
                  form.roles.includes(role)
                    ? "bg-sky-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
                {form.roles.includes(role) && (
                  <span className="ml-2">
                    <CheckIcon className="h-5 w-5 inline" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button className="px-4 py-2 bg-sky-600  rounded-md text-white cursor-pointer">
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUser;
