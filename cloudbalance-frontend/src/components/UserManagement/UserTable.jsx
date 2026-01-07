import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { USER_TABLE_HEADINGS } from "../../constants/userTableHeading";
import EditIcon from "@mui/icons-material/Edit";
import { formatDateTime } from "../../utils/formateDate";
import { getAllUserApi } from "../../APIs/user.api";
const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUserApi();
      console.log(res, " this is in usertable ")
      if (res.status === 200) {
        setUsers(res.data);
      }
    };
    fetchUsers();
  }, []);

  const tableHeadings = useMemo(() => {
    return USER_TABLE_HEADINGS;
  }, []);

  return (
    <div className="pl-4 mt-4 pb-4">
      <Link to="/dashboard/user-management/adduser">
        <button className="px-4 py-2 bg-sky-600  rounded-md text-white cursor-pointer">
          Add User
        </button>
      </Link>
      <table className=" py-4 h-full w-[90%] border-2 my-4 ">
        <thead>
          <tr className="text-white bg-sky-800 ">
            {tableHeadings.map((heading) => {
              return (
                <th key={heading.key} className="px-4 py-2">
                  {heading.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                key={user.id}
                className={`${
                  index % 2 == 0 ? "bg-slate-100" : "bg-slate-200"
                } hover:bg-slate-300 py-4`}
              >
                {tableHeadings.map((heading) => {
                  return (
                    <td className="px-4 py-4 text-center">
                      <span>
                        {heading.key === "actions" ? (
                          <span>
                            <Link
                              to={`/dashboard/user-management/edituser/${user.id}`}
                            >
                              <EditIcon />
                            </Link>
                          </span>
                        ) : (
                          <span>
                            {heading.key === "lastLogin" ? (
                              <span>{formatDateTime(user[heading.key])}</span>
                            ) : (
                              <span>{user[heading.key]}</span>
                            )}
                          </span>
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
