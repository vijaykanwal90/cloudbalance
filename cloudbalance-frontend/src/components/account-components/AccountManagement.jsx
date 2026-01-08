import React, { useEffect, useState } from "react";
import UserSelector from "./UserSelector";
import SelectedUser from "./SelectedUser";
import AssignAccount from "./AssignAccount";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserApi, getUserByIdApi } from "../../APIs/user.api";
import { addUsers } from "../../redux/actions/user-action";
import { useParams } from "react-router-dom";
const AccountManagement = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  const { id } = useParams();
  const users = useSelector((store) => store.users.users);
  
  useEffect(()=>{
const fetchUser = async () => {
      const res = await getUserByIdApi(id);
      setSelectedUser(res.data);
    };
    fetchUser()
  },[id])
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
  console.log(selectedUser);
  return (
    <div className="py-4">
      <UserSelector
        users={users}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />
      <AssignAccount users={users} selectedUser={selectedUser} />
    </div>
  );
};

export default AccountManagement;
