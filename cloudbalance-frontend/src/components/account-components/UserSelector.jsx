import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";



const UserSelector = ({users,selectedUser, setSelectedUser}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const handleUserSelection = (user,userId)=>{
       if( selectedUser!=null && userId === selectedUser.id){
          setSelectedUser(null)
       }
       else {
        setSelectedUser(user)
       }

   }
  return (
    <div className="mb-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-sky-600 text-white rounded-md cursor-pointer"
      >
        Select Customer
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />

          <div className="relative z-10 w-[400px] h-[450px] bg-white rounded-lg shadow-xl flex flex-col">
            <CloseIcon
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-black"
              fontSize="small"
            />

            <div className="px-4 pt-5 pb-3 border-b">
              <h3 className="text-sm font-semibold mb-3">Select User</h3>

              <div className="flex items-center gap-2 border rounded px-2 py-1">
                <SearchIcon fontSize="small" className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border-none outline-none focus:ring-0 text-sm"
                />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-3 py-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-slate-100 text-sm"
                  onClick={()=>{
                    handleUserSelection(user,user.id)
                  }}
                >
                  <Checkbox size="small" />
                  <span>{user.firstName}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelector;
