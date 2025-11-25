import React from "react";
import { Link } from "react-router-dom";
const tableHeadings = [
  "First Name",
  "Last Name",
  "Email ID",
  "Roles",
  "Last Login",
  "Actions",
];

const userData = [
  {
    "First Name": "Aarav",
    "Last Name": "Sharma",
    "Email ID": "aarav.sharma@example.com",
    Roles: ["Admin"],
    "Last Login": "2025-11-24 08:30 AM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Priya",
    "Last Name": "Singh",
    "Email ID": "priya.singh@example.com",
    Roles: ["Admin"],
    "Last Login": "2025-11-23 10:15 AM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Ravi",
    "Last Name": "Kumar",
    "Email ID": "ravi.kumar@example.com",
    Roles: ["Admin"],
    "Last Login": "2025-11-22 09:00 AM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Neha",
    "Last Name": "Patel",
    "Email ID": "neha.patel@example.com",
    Roles: ["Admin", "Customer"],
    "Last Login": "2025-11-24 05:00 PM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Amit",
    "Last Name": "Verma",
    "Email ID": "amit.verma@example.com",
    Roles: ["User"],
    "Last Login": "2025-11-20 02:45 PM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Sanya",
    "Last Name": "Desai",
    "Email ID": "sanya.desai@example.com",
    Roles: ["Admin", "Customer"],
    "Last Login": "2025-11-21 11:30 AM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Simran",
    "Last Name": "Gupta",
    "Email ID": "simran.gupta@example.com",
    Roles: ["Customer"],
    "Last Login": "2025-11-24 01:30 PM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Vikram",
    "Last Name": "Chauhan",
    "Email ID": "vikram.chauhan@example.com",
    Roles: ["Read-Only"],
    "Last Login": "2025-11-23 08:45 AM",
    Actions: "View Only",
  },
  {
    "First Name": "Raj",
    "Last Name": "Joshi",
    "Email ID": "raj.joshi@example.com",
    Roles: ["Admin", "Read-Only"],
    "Last Login": "2025-11-22 04:00 PM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Rina",
    "Last Name": "Shukla",
    "Email ID": "rina.shukla@example.com",
    Roles: ["Customer"],
    "Last Login": "2025-11-21 09:20 AM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Ananya",
    "Last Name": "Patel",
    "Email ID": "ananya.patel@example.com",
    Roles: ["Read-Only"],
    "Last Login": "2025-11-20 03:40 PM",
    Actions: "View Only",
  },
  {
    "First Name": "Aakash",
    "Last Name": "Mehra",
    "Email ID": "aakash.mehra@example.com",
    Roles: ["Admin"],
    "Last Login": "2025-11-19 06:10 PM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Maya",
    "Last Name": "Reddy",
    "Email ID": "maya.reddy@example.com",
    Roles: ["Customer"],
    "Last Login": "2025-11-18 10:25 AM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Manish",
    "Last Name": "Tiwari",
    "Email ID": "manish.tiwari@example.com",
    Roles: ["Admin", "Customer"],
    "Last Login": "2025-11-17 07:55 PM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Sushma",
    "Last Name": "Kumar",
    "Email ID": "sushma.kumar@example.com",
    Roles: ["Read-Only"],
    "Last Login": "2025-11-16 12:00 PM",
    Actions: "View Only",
  },
  {
    "First Name": "Karan",
    "Last Name": "Yadav",
    "Email ID": "karan.yadav@example.com",
    Roles: ["Customer", "Read-Only"],
    "Last Login": "2025-11-15 04:45 PM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Kriti",
    "Last Name": "Sood",
    "Email ID": "kriti.sood@example.com",
    Roles: ["Read-Only"],
    "Last Login": "2025-11-14 09:30 AM",
    Actions: "View Only",
  },
  {
    "First Name": "Jai",
    "Last Name": "Mishra",
    "Email ID": "jai.mishra@example.com",
    Roles: ["Admin"],
    "Last Login": "2025-11-13 02:20 PM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Ritika",
    "Last Name": "Bhatia",
    "Email ID": "ritika.bhatia@example.com",
    Roles: ["Customer"],
    "Last Login": "2025-11-12 11:10 AM",
    Actions: "Edit | Delete",
  },
  {
    "First Name": "Vijay",
    "Last Name": "kanwal",
    "Email ID": "vijay.kanwal@example.com",
    Roles: ["Admin", "Read-Only"],
    "Last Login": "2025-11-11 07:35 PM",
    Actions: "Edit | Delete",
  },
];

const UserTable = () => {
  return (
    <>
      <Link to="/dashboard/user-management/add-user">
        <button className="px-4 py-2 bg-sky-600  rounded-md text-white cursor-pointer">
          Add User
        </button>
      </Link>
      <table className=" py-4 h-full w-fit border-2 my-4 ">
        <thead>
          <tr className="text-white bg-sky-800 ">
            {tableHeadings.map((heading) => {
              return (
                <th className="px-6 py-2" key={heading}>
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => {
            return (
              <tr
                key={user.email}
                className={`${
                  index % 2 == 0 ? "bg-slate-100" : "bg-slate-200"
                } hover:bg-slate-300`}
              >
                {Object.keys(user).map((key, index) => {
                  return (
                    <td className="px-6 py-2" key={index}>
                      {Array.isArray(user[key]) ? (
                        user[key].map((role, index) => {
                          return <span key={index}>{role} &nbsp;</span>;
                        })
                      ) : (
                        <span>
                          {key === "Actions" && user[key].includes("Edit") ? (
                            <Link to={"/dashboard/user-management/add-user"}>
                              Edit
                            </Link>
                          ) : (
                            <span> {user[key]} </span>
                          )}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
