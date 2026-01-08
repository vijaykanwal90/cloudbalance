import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { USER_TABLE_HEADINGS } from "../../constants/userTableHeading";
import { formatDateTime } from "../../utils/formateDate";
import { getAllUserApi } from "../../APIs/user.api";
import { addUsers } from "../../redux/actions/user-action";

const UserTable = () => {
  const dispatch = useDispatch();

  const users = useSelector((store) => store.users.users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUserApi();
        if (res.status === 200) {
          dispatch(addUsers(res.data));
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    if (!users || users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, users]);
  console.log(users);
  const tableHeadings = useMemo(() => USER_TABLE_HEADINGS, []);

  return (
    <div className="pl-4 mt-4 pb-4">
      <div className="flex gap-4 mb-4">
        <Link to="/dashboard/user-management/adduser">
          <button className="px-4 py-2 bg-sky-600 rounded-md text-white">
            Add User
          </button>
        </Link>

        <Link to="/dashboard/assign-account">
          <button className="px-4 py-2 bg-sky-600 rounded-md text-white">
            Assign Account
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-[90%] border border-slate-300">
          <thead>
            <tr className="bg-sky-800 text-white">
              {tableHeadings.map((heading) => (
                <th key={heading.key} className="px-4 py-2 text-left">
                  {heading.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
                } hover:bg-slate-300`}
              >
                {tableHeadings.map((heading) => (
                  <td key={heading.key} className="px-4 py-3">
                    {heading.key === "actions" ? (
                      <span className="flex gap-4 justify-center">
                        {/* Edit → not admin */}
                        {user.role !== "ADMIN" && (
                          <Link
                            to={`/dashboard/user-management/edituser/${user.id}`}
                          >
                            <EditIcon fontSize="small" />
                          </Link>
                        )}
                        {/* Manage Account → only customer */}
                        {user.role === "CUSTOMER" && (
                          <Link to={`/dashboard/assign-account/${user.id}`}>
                            <ManageAccountsIcon fontSize="small" />
                          </Link>
                        )}
                      </span>
                    ) : heading.key === "lastLogin" ? (
                      formatDateTime(user[heading.key])
                    ) : (
                      user[heading.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-slate-500 mt-4">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserTable;
