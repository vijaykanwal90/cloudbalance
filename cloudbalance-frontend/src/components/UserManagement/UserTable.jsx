import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { USER_TABLE_HEADINGS } from "../../constants/userTableHeading";
import { formatDateTime } from "../../utils/formateDate";
import { getAllUserApi } from "../../APIs/user.api";
import { addUsers } from "../../redux/actions/user-action";
import { fetchCurrentUser } from "../../redux/actions/auth-action";

const UserTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((data) => {
    return data.auth;
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [user]);
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
  const tableHeadings = useMemo(() => USER_TABLE_HEADINGS, []);

  return (
    <div className="p-6">
      {user?.role === "ADMIN" && (
        <div className="flex justify-start mb-6">
          <Link to="/dashboard/user-management/adduser">
            <button className="px-5 py-2 bg-sky-800 hover:bg-sky-700 text-white font-medium rounded-md shadow">
              Add User
            </button>
          </Link>
        </div>
      )}

      <div className="overflow-x-auto shadow rounded-lg bg-white border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-sky-900 sticky top-0">
            <tr>
              {tableHeadings.map((heading) => (
                <th
                  key={heading.key}
                  className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
                >
                  {heading.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {users.map((listUser, index) => (
              <tr
                key={listUser.id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                } hover:bg-slate-200`}
              >
                {tableHeadings.map((heading) => (
                  <td
                    key={heading.key}
                    className="px-6 py-4 text-sm text-slate-700"
                  >
                    {heading.key === "actions" ? (
                      <div className="flex gap-3 justify-center items-center">
                        {user?.role === "ADMIN" ? (
                          <Link
                            to={`/dashboard/user-management/edituser/${listUser.id}`}
                            className="text-sky-700 hover:text-sky-900"
                          >
                            <EditIcon fontSize="small" />
                          </Link>
                        ) : (
                          <span className="opacity-40 cursor-not-allowed">
                            <EditIcon fontSize="small" />
                          </span>
                        )}
                      </div>
                    ) : heading.key === "lastLogin" ? (
                      formatDateTime(listUser[heading.key])
                    ) : (
                      listUser[heading.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center text-slate-500 py-6 font-medium">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
